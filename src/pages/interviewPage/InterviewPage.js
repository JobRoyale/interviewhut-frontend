import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import getUserData from '../../utils/getUserData';

const InterviewPage = ({ socketData }) => {
  const socket = socketData.socket;

  // My details
  const myUsername = getUserData().username;
  const [myStream, setMyStream] = useState();

  // Other caller details
  const [callerUsername, setCallerUsername] = useState('');
  const [callerSignal, setCallerSignal] = useState();

  const [receivingCall, setReceivingCall] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const otherMemberVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setMyStream(stream);
        myVideo.current.srcObject = stream;
      });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCallerUsername(data.from);
      setCallerSignal(data.signal);
    });
  }, [socket]);

  const callUser = (username) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: myStream,
    });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        usernameToCall: username,
        signal: data,
        from: myUsername,
      });
    });
    peer.on('stream', (stream) => {
      otherMemberVideo.current.srcObject = stream;
    });
    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: myStream,
    });
    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: callerUsername });
    });

    peer.on('stream', (stream) => {
      otherMemberVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <div>
      <div className="video">
        {myStream && (
          <video
            playsInline
            muted
            ref={myVideo}
            autoPlay
            style={{ width: '300px' }}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
});

export default connect(mapStateToProps, {})(InterviewPage);
