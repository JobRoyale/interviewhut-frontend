/* eslint-disable */
import React, { useRef, useEffect, useState, useMemo, useCallback} from 'react';
import Peer from 'simple-peer';
import { connect } from 'react-redux';
import getUserData from '../../utils/getUserData';
import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import Header from '../../components/header/Header';

import { createEditor , Editor, Transforms, Text} from 'slate';
import { Slate, Editable, withReact } from 'slate-react';

const InterviewPage = ({ socketData, roomData }) => {
  const socket = socketData.socket;

  const editor = useMemo(() => withReact(createEditor()), []);
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

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

    socket.off('callUser').on('callUser', (data) => {
      setReceivingCall(true);
      setCallerUsername(data.from);
      setCallerSignal(data.signal);
      setIsOpen(true);
    });

    socket.on("RCV_MSG", data =>{
      console.log(data);
      console.log("recieved data:",data.content[0].children[0].text);
      setValue(data.content);
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

    socket.off('callAccepted').on('callAccepted', (signal) => {
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

  const handleStartVideoCall = () => {
    if (roomData.room.config.admin === myUsername) {
      for (let team in roomData.room.teams) {
        if (team !== myUsername) {
          callUser(team);
        }
      }
    }
  };

  const CustomEditor = {
    isBoldMarkActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.bold === true,
        universal: true,
      })
  
      return !!match
    },
  
    isCodeBlockActive(editor) {
      const [match] = Editor.nodes(editor, {
        match: n => n.type === 'code',
      })
  
      return !!match
    },
  
    toggleBoldMark(editor) {
      const isActive = CustomEditor.isBoldMarkActive(editor)
      Transforms.setNodes(
        editor,
        { bold: isActive ? null : true },
        { match: n => Text.isText(n), split: true }
      )
    },
  
    toggleCodeBlock(editor) {
      const isActive = CustomEditor.isCodeBlockActive(editor)
      Transforms.setNodes(
        editor,
        { type: isActive ? null : 'code' },
        { match: n => Editor.isBlock(editor, n) }
      )
    },
  }

  const DefaultElement = props => {
    return <p {...props.attributes}>{props.children}</p>
  }

  const CodeElement = props => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    )
  }

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  const Leaf = props => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
      >
        {props.children}
      </span>
    )
  }

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Flex flexDirection="column" h="100vh">
      <Header />
      <Flex>
        <Flex height="100%" width="80%">
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => {
            setValue(newValue);

            socket.emit('SEND_MSG', { content: value}, (data) => {
              console.log('everyone self send', data);
            });

            console.log("sent msg:", value);
          }}
        >
        <div>
          <Button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor)
            }}
          >
            Bold
          </Button>
          <Button
            onMouseDown={event => {
              event.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
          >
            Code
          </Button>
        </div>
        <div>
        <Editable 
          renderElement = {renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }
  
            switch (event.key) {
              case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
              }
  
              case 'b': {
                event.preventDefault()
                CustomEditor.toggleBoldMark(editor)
                break
              }
            }
          }}/>
          </div>
        </Slate>
        </Flex>
        <Flex height="100%" width="20%" flexDirection="column">
          <Flex width="100%">
            {myStream && (
              <video
                playsInline
                muted
                ref={myVideo}
                autoPlay
                style={{ width: '100%' }}
              />
            )}
          </Flex>
          {'joelmathewkoshy' === myUsername && !callAccepted && !callEnded ? (
            <Flex
              width="100%"
              padding="10px"
              alignItems="center"
              justifyContent="center"
            >
              <Button width="50%" onClick={handleStartVideoCall}>
                Start video call
              </Button>
            </Flex>
          ) : null}
          <Flex>
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={otherMemberVideo}
                autoPlay
                style={{ width: '300px' }}
              />
            ) : null}
          </Flex>
          <div>
            {receivingCall && !callAccepted ? (
              <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Video Call
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      {callerUsername} requested for video access
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button colorScheme="green" onClick={answerCall} ml={3}>
                        Accept
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>
            ) : null}
          </div>
        </Flex>
      </Flex>
    </Flex>
  );
};

const mapStateToProps = (state) => ({
  socketData: state.socketData,
  roomData: state.roomData,
});

export default connect(mapStateToProps, {})(InterviewPage);

