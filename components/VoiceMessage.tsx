
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, Send, X } from 'lucide-react';

interface VoiceMessageRecorderProps {
  onSend: (audioData: { duration: number; waveform: number[] }) => void;
  onCancel: () => void;
}

export const VoiceMessageRecorder: React.FC<VoiceMessageRecorderProps> = ({ onSend, onCancel }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [waveform, setWaveform] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Auto start recording
    startRecording();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setWaveform([]);
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
      setWaveform(prev => [...prev, Math.random() * 0.8 + 0.2]);
    }, 100);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleSend = () => {
    stopRecording();
    onSend({ duration: recordingTime / 10, waveform });
  };

  const handleCancel = () => {
    stopRecording();
    onCancel();
  };

  const formatTime = (tenths: number) => {
    const secs = Math.floor(tenths / 10);
    const mins = Math.floor(secs / 60);
    const remainSecs = secs % 60;
    return `${mins}:${remainSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-red-50 rounded-2xl border border-red-200 animate-fade-in">
      <button onClick={handleCancel} className="p-2 text-red-400 hover:text-red-600 transition-colors">
        <Trash2 size={18} />
      </button>
      
      <div className="flex-1 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        <span className="text-red-600 font-mono text-sm font-bold">{formatTime(recordingTime)}</span>
        
        {/* Waveform visualization */}
        <div className="flex-1 flex items-center gap-[2px] h-8 overflow-hidden">
          {waveform.slice(-40).map((h, i) => (
            <div
              key={i}
              className="w-1 bg-red-400 rounded-full transition-all"
              style={{ height: `${h * 100}%`, minHeight: '4px' }}
            />
          ))}
        </div>
      </div>

      <button onClick={handleSend} className="p-3 bg-amber-500 text-white rounded-full shadow-lg active:scale-90 transition-all">
        <Send size={18} />
      </button>
    </div>
  );
};

interface VoiceMessagePlayerProps {
  duration: number;
  waveform: number[];
  isSent: boolean;
}

export const VoiceMessagePlayer: React.FC<VoiceMessagePlayerProps> = ({ duration, waveform, isSent }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      const totalSteps = duration * 10;
      let step = progress * totalSteps;
      timerRef.current = setInterval(() => {
        step++;
        const newProgress = step / totalSteps;
        if (newProgress >= 1) {
          setProgress(0);
          setIsPlaying(false);
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          setProgress(newProgress);
        }
      }, 100);
    }
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainSecs = Math.floor(secs % 60);
    return `${mins}:${remainSecs.toString().padStart(2, '0')}`;
  };

  const displayWaveform = waveform.length > 30 ? waveform.filter((_, i) => i % Math.ceil(waveform.length / 30) === 0) : waveform;

  return (
    <div className={`flex items-center gap-2 p-3 rounded-2xl min-w-[200px] ${isSent ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
      <button onClick={togglePlay} className={`p-2 rounded-full flex-shrink-0 ${isSent ? 'bg-white/20' : 'bg-amber-500 text-white'}`}>
        {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
      </button>
      
      <div className="flex-1 flex items-center gap-[2px] h-6">
        {displayWaveform.map((h, i) => {
          const isActive = i / displayWaveform.length <= progress;
          return (
            <div
              key={i}
              className={`w-1 rounded-full transition-all ${
                isSent
                  ? isActive ? 'bg-white' : 'bg-white/40'
                  : isActive ? 'bg-amber-500' : 'bg-slate-300'
              }`}
              style={{ height: `${h * 100}%`, minHeight: '3px' }}
            />
          );
        })}
      </div>
      
      <span className={`text-[10px] font-mono flex-shrink-0 ${isSent ? 'text-white/80' : 'text-slate-400'}`}>
        {formatDuration(duration)}
      </span>
    </div>
  );
};

interface VoiceButtonProps {
  onStartRecording: () => void;
  isRecording: boolean;
}

export const VoiceButton: React.FC<VoiceButtonProps> = ({ onStartRecording, isRecording }) => {
  return (
    <button
      onClick={onStartRecording}
      className={`p-3 rounded-full transition-all active:scale-90 ${
        isRecording
          ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-200'
          : 'bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600'
      }`}
    >
      <Mic size={20} />
    </button>
  );
};

export default VoiceMessageRecorder;
