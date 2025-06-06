
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Monitor, Volume2, VolumeX, Smartphone, Waves } from 'lucide-react';

interface HoloCommand {
  id: string;
  command: string;
  response: string;
  timestamp: Date;
}

const HolographicInterface: React.FC = () => {
  const [isHoloActive, setIsHoloActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [commands, setCommands] = useState<HoloCommand[]>([]);
  const [currentGesture, setCurrentGesture] = useState<string>('');

  useEffect(() => {
    if (isHoloActive) {
      const gestureInterval = setInterval(() => {
        const gestures = ['Peace Sign', 'Open Palm', 'Prayer Hands', 'Blessing Gesture'];
        setCurrentGesture(gestures[Math.floor(Math.random() * gestures.length)]);
      }, 3000);

      return () => clearInterval(gestureInterval);
    }
  }, [isHoloActive]);

  const simulateVoiceCommand = () => {
    const voiceCommands = [
      { command: "Show sacred locations", response: "Displaying 12 sacred sites within 50km radius" },
      { command: "Prayer time notification", response: "Next prayer time: Maghrib at 6:47 PM" },
      { command: "Ethics consultation", response: "Connecting to interfaith council..." },
      { command: "Environmental status", response: "All systems within sacred parameters" }
    ];

    const randomCommand = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
    const newCommand: HoloCommand = {
      id: Date.now().toString(),
      ...randomCommand,
      timestamp: new Date()
    };

    setCommands(prev => [newCommand, ...prev.slice(0, 4)]);
  };

  return (
    <Card className="w-full bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Monitor className="w-6 h-6 text-cyan-600" />
          <span>Holographic Interface System</span>
          {isHoloActive && (
            <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
              Projection Active
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => setIsHoloActive(!isHoloActive)}
            variant={isHoloActive ? "destructive" : "default"}
            className="w-full"
          >
            <Monitor className="w-4 h-4 mr-2" />
            {isHoloActive ? 'Deactivate Holo' : 'Activate Hologram'}
          </Button>

          <Button 
            onClick={() => setVoiceEnabled(!voiceEnabled)}
            variant={voiceEnabled ? "secondary" : "outline"}
            className="w-full"
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 mr-2" /> : <VolumeX className="w-4 h-4 mr-2" />}
            Voice {voiceEnabled ? 'On' : 'Off'}
          </Button>
        </div>

        {isHoloActive && (
          <>
            <div className="relative h-40 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-cyan-400/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 mx-auto mb-3 border-2 border-cyan-400 rounded-full animate-pulse"></div>
                  <p className="text-sm font-medium">Holographic Projection Active</p>
                  <p className="text-xs opacity-75">3D Sacred Interface</p>
                </div>
              </div>
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-100">
                  8K Resolution
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white rounded-lg">
                <Smartphone className="w-5 h-5 mx-auto mb-2 text-blue-500" />
                <div className="text-sm font-bold">Gesture Recognition</div>
                <div className="text-xs text-blue-600">{currentGesture || 'Detecting...'}</div>
              </div>

              <div className="text-center p-3 bg-white rounded-lg">
                <Waves className="w-5 h-5 mx-auto mb-2 text-purple-500" />
                <div className="text-sm font-bold">Neural Interface</div>
                <div className="text-xs text-purple-600">Thought Pattern: Active</div>
              </div>
            </div>

            {voiceEnabled && (
              <div className="space-y-3">
                <Button 
                  onClick={simulateVoiceCommand}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Volume2 className="w-4 h-4 mr-2" />
                  Simulate Voice Command
                </Button>

                {commands.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {commands.map((cmd) => (
                      <div key={cmd.id} className="p-3 bg-white rounded-lg border-l-4 border-green-500">
                        <div className="text-sm font-medium text-gray-800">"{cmd.command}"</div>
                        <div className="text-xs text-green-600 mt-1">{cmd.response}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {cmd.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="p-3 bg-yellow-100 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800 text-center">
                🌟 Holographic interface adapts to sacred geometry patterns for enhanced spiritual interaction
              </p>
            </div>
          </>
        )}

        <div className="text-center text-xs text-muted-foreground">
          Advanced AR/VR integration with gesture and voice recognition
        </div>
      </CardContent>
    </Card>
  );
};

export default HolographicInterface;
