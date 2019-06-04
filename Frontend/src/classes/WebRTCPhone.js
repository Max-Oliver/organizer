import JsSIP from "jssip";

export default class {

    constructor(settings) {

        this.ua = null;
        this.line1 = null;
        this.remoteView = undefined;
        this.selfView = undefined;
        this.domain = settings.domain;
        this.proxy = settings.proxy;
        this.callerid = settings.callerid;
        this.password = settings.password;
        this.voice = '{ mandatory : { googEchoCancellation: true, googEchoCancellation2: true, googAutoGainControl: true, googNoiseSuppression: true, googHighpassFilter: true, googTypingNoiseDetection: true } }';
        this.stun = settings.stun;
        this.socket = new JsSIP.WebSocketInterface('wss://' + this.proxy);
        this.configuration = {
            'sockets': [this.socket],
            'uri': 'sip:' + this.callerid + '@' + this.domain,
            'password': this.password,
            'session_timers': true
        };
    }

    setVideoElements(me, agent) {
        this.selfView = me;
        this.remoteView = agent;
    }

    startUA() {
        if (this.ua == null) {
            this.ua = new JsSIP.UA(this.configuration);
            this.ua.start();
        }
    }

    unregister(settings) {
        if (this.ua != null) {
            this.ua.unregister();
            this.ua.stop();

            this.domain = settings.domain;
            this.proxy = settings.proxy;
            this.callerid = settings.callerid;
            this.password = settings.password;
            this.socket = new JsSIP.WebSocketInterface('wss://' + this.proxy);

            this.configuration = {
                'sockets': [this.socket],
                'uri': 'sip:' + this.callerid + '@' + this.domain,
                'password': this.password,
                'session_timers': true
            };
            this.ua = null;
            this.ua = new JsSIP.UA(this.configuration);
            this.ua.start();
            this.ua.register();
        }
    }

    attachCallEventHandlers() {

        // this.line1.on('peerconnection', (data) => {});
        // this.line1.on('progress', (data) => {});
        // this.line1.on('accepted', (data) => {});
        // this.line1.on('newDTMF', (data) => {});
        // this.line1.on('hold', (data) => {});
        // this.line1.on('unhold', (data) => {});
        // this.line1.on('muted', (data) => {});
        // this.line1.on('unmuted', (data) => {});
        // this.line1.on('reinvite', (data) => {});
        // this.line1.on('update', (data) => {});
        // this.line1.on('refer', (data) => {});
        // this.line1.on('replaces', (data) => {});
        // this.line1.on('sdp', (data) => {});

        this.line1.on('connecting', (data) => {
            this.attachRTCHandlers();
        });

        // this.line1.on('sending', (data) => {
        //   this.sendOutCall();
        // });

        this.line1.on('confirmed', (data) => {
            this.selfView.srcObject = this.line1.connection.getLocalStreams()[0];
        });

        var end = this.__endcall;
        this.line1.on('ended', (data) => {
            if (typeof data.message !== "undefined" && data.message !== null) {
                if (typeof data.message.headers !== "undefined" && data.message.headers !== null) {
                    if (typeof data.message.headers["X-Asterisk-Hangupcausecode"] !== "undefined" && data.message.headers["X-Asterisk-Hangupcausecode"] !== null) {
                        if (typeof data.message.headers["X-Asterisk-Hangupcausecode"][0].raw !== "undefined" && data.message.headers["X-Asterisk-Hangupcausecode"][0].raw !== null) {
                            if (typeof data.message.headers["X-Asterisk-Hangupcausecode"][0].raw !== "undefined" && data.message.headers["X-Asterisk-Hangupcausecode"][0].raw === 19) {

                            }
                        }
                    }
                }
            }

            this.line1 = null;
            this.audio = false;
            this.video = false;

            end();

        });


        this.line1.on('failed', data => {
            this.line1 = null;
            this.audio = false;
            //this.sendOutCall(this.video, false);
            this.emptyVideo();
            this.video = false;

            //setTimeout(this.cancelVideoCall, 500);

            if (data.cause === 'Canceled') {
                //unifiedInboxNotification(nombreAgente, i18n.t('webchat.CALLFAIL'), urlAgentImage);
            }

        });

    }

    attachRTCHandlers() {

        this.line1.connection.onaddstream = (data) => {

            this.remoteView.srcObject = data.stream;
            //console.log('Add Stream...');
        };

        this.line1.connection.onremovestream = (data) => {
            //console.log('Removestream...');
        };

        this.line1.connection.oniceconnectionstatechange = (data) => {
            if (data.state === 'connected') {
                //successfull
            } else if (data.state === 'failed' || data.state === 'disconnected' || data.state === 'closed') {
                //error
            }
        };

    }

    //si video es true, la llamada es una videollamada
    makeCall(destination, video) {
        if (this.ua.status === 1) {
            if (this.line1 == null) {
                this.video = video;
                let options = {
                    'mediaConstraints': {
                        'audio': this.voice,
                        'video': video
                    },
                    'extraHeaders': ['VIDEO : ' + video],
                    'pcConfig': {
                        'iceServers': [{
                            'urls': [this.stun]
                        }]
                    }
                };
                this.ua.call('sip:' + destination + '@' + this.domain, options);
            }
        } else {
            setTimeout(() => {
                this.makeCall(destination, video)
            }, 500);
        }
    }

    answer(video) {
        if (this.line1 !== null && this.line1.direction != 'outgoing') {
            var options = {
                'mediaConstraints': {
                    'audio': this.voice,
                    'video': video
                },
                'pcConfig': {
                    'iceServers': [{
                        'urls': [this.stun]
                    }]
                }
            };
            this.line1.answer(options);
        }
    }

    sendMessage(sipurl, message) {
        this.ua.sendMessage(sipurl, message);
    }

    hangUp() {
        if (this.ua != null) {
            this.ua.terminateSessions();
        }
        this.line1 = null;
    }

    sendDTMF(dtmfval) {
        if (this.line1 != null) {
            this.line1.sendDTMF(dtmfval);
        }
    }

    mute() {
        if (this.line1 != null) {
            this.line1.mute();
        }
    }

    unmute() {
        if (this.line1 != null) {
            this.line1.unmute();
        }
    }

    hold() {
        if (this.line1 != null) {
            this.line1.hold();
        }
    }

    unhold() {
        if (this.line1 != null) {
            this.line1.unhold();
        }
    }

    attTrans() {
        if (this.line1 != null) {
            this.line1.sendDTMF('#0');
        }
    }

    blindTrans() {
        if (this.line1 !== null) {
            this.line1.sendDTMF('##');
        }
    }

    emptyVideo() {
        this.remoteView.src = "";
        this.selfView.src = "";
    }

}