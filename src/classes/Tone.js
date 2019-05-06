export default class {

    constructor(context, freq1, freq2) {
        this.context = context;
        this.status = 0;
        this.freq1 = freq1;
        this.freq2 = freq2;
    }

    setup() {
        this.osc1 = this.context.createOscillator();
        this.osc2 = this.context.createOscillator();
        console.log('FRECUENCIES => ', this.freq1, this.freq2)
        this.osc1.frequency.value = this.freq1;
        this.osc2.frequency.value = this.freq2;

        this.gainNode = this.context.createGain();
        this.gainNode.gain.value = 0.1;

        // this.filter = this.context.createBiquadFilter();
        // this.filter.type = "lowpass";
        //this.filter.frequency = 8000;

        this.osc1.connect(this.gainNode);
        this.osc2.connect(this.gainNode);

        this.gainNode.connect(this.context.destination);
    }

    start() {
        this.setup();
        this.osc1.start ? this.osc1.start(0) : this.osc1.noteOn(0)
        this.osc2.start ? this.osc2.start(0) : this.osc2.noteOn(0)
        this.status = 1;
    }

    stop() {
        this.osc1.stop(0);
        this.osc2.stop(0);
        this.status = 0;
    }

    createRingerLFO() {
        // Create an empty 3 second mono buffer at the
        // sample rate of the Audiocontext
        var channels = 1;
        var sampleRate = this.context.sampleRate;
        var frameCount = sampleRate * 6;
        var arrayBuffer = this.context.createBuffer(channels, frameCount, sampleRate);

        // getChannelData allows us to access and edit the buffer data and change.
        var bufferData = arrayBuffer.getChannelData(0);
        for (var i = 0; i < frameCount; i++) {
            // if the sample lies between 0 and 0.4 seconds, or 0.6 and 1 second, we want it to be on.
            //if ((i/sampleRate > 0 && i/sampleRate < 0.4) || (i/sampleRate > 0.6 && i/sampleRate < 1.0)){
            if ((i / sampleRate > 0 && i / sampleRate < 2)) {
                bufferData[i] = 0.25;
            }
        }

        this.ringerLFOBuffer = arrayBuffer;
    }

    startRinging() {
        this.start();
        // set our gain node to 0, because the LFO is calibrated to this level
        this.gainNode.gain.value = 0;
        this.status = 1;

        this.createRingerLFO();

        this.ringerLFOSource = this.context.createBufferSource();
        this.ringerLFOSource.buffer = this.ringerLFOBuffer;
        this.ringerLFOSource.loop = true;
        // connect the ringerLFOSource to the gain Node audio param
        this.ringerLFOSource.connect(this.gainNode.gain);
        this.ringerLFOSource.start(0);
    }

    stopRinging() {
        this.stop();
        this.ringerLFOSource.stop(0);
    }

}