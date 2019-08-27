'use strict';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

let wave = audioCtx.createPeriodicWave(triangle.real, triangle.imag);

let attackTime = 0.2;
let releaseTime = 0.5;
let sweepLength = 2;
let frequency = 440;

const attackControl = document.querySelector('#attack');
const releaseControl = document.querySelector('#release');
const frequencyControl = document.querySelector('#frequency');
const playButton = document.querySelector('#play-button');

attackControl.addEventListener('input', function() {
    attackTime = Number(this.value);
}, false);

releaseControl.addEventListener('input', function() {
    releaseTime = Number(this.value);
}, false);

playButton.addEventListener('click', function() {
    playSweep();
}, false);

frequencyControl.addEventListener('input', function() {
    frequency = Number(this.value);
}, false);

function playSweep() {
    let osc = audioCtx.createOscillator();
    osc.setPeriodicWave(wave);
    osc.frequency.value = frequency;

    let sweepEnv = audioCtx.createGain();
    sweepEnv.gain.cancelScheduledValues(audioCtx.currentTime);
    sweepEnv.gain.setValueAtTime(0, audioCtx.currentTime);

    // set our attack
    sweepEnv.gain.linearRampToValueAtTime(1, audioCtx.currentTime + attackTime);

    // set our release
    sweepEnv.gain.linearRampToValueAtTime(0, audioCtx.currentTime + sweepLength - releaseTime);

    osc.connect(sweepEnv).connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + sweepLength);
}