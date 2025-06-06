
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Thermometer, Droplets, Wind, Leaf, Zap, AlertTriangle } from 'lucide-react';

interface EnvironmentalData {
  temperature: number;
  humidity: number;
  airQuality: number;
  solarRadiation: number;
  windSpeed: number;
  biodiversityIndex: number;
  quantumFluctuation: number;
}

const EnvironmentalQuantumSensor: React.FC = () => {
  const [envData, setEnvData] = useState<EnvironmentalData>({
    temperature: 24.5,
    humidity: 65,
    airQuality: 78,
    solarRadiation: 850,
    windSpeed: 12.3,
    biodiversityIndex: 0.82,
    quantumFluctuation: 0.156
  });

  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEnvData(prev => {
        const newData = {
          temperature: Math.max(15, Math.min(40, prev.temperature + (Math.random() - 0.5) * 2)),
          humidity: Math.max(30, Math.min(90, prev.humidity + (Math.random() - 0.5) * 5)),
          airQuality: Math.max(0, Math.min(100, prev.airQuality + (Math.random() - 0.5) * 3)),
          solarRadiation: Math.max(0, Math.min(1200, prev.solarRadiation + (Math.random() - 0.5) * 50)),
          windSpeed: Math.max(0, Math.min(30, prev.windSpeed + (Math.random() - 0.5) * 2)),
          biodiversityIndex: Math.max(0, Math.min(1, prev.biodiversityIndex + (Math.random() - 0.5) * 0.02)),
          quantumFluctuation: Math.random() * 0.3
        };

        // Generate alerts
        const newAlerts: string[] = [];
        if (newData.airQuality < 50) newAlerts.push('Air quality below optimal');
        if (newData.biodiversityIndex < 0.5) newAlerts.push('Biodiversity threat detected');
        if (newData.quantumFluctuation > 0.25) newAlerts.push('Quantum field instability');
        
        setAlerts(newAlerts);
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value >= thresholds.good) return 'text-green-600';
    if (value >= thresholds.warning) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="w-full bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Leaf className="w-6 h-6 text-green-600" />
          <span>Environmental Quantum Sensors</span>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Live Monitoring
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-white rounded-lg">
            <Thermometer className="w-5 h-5 mx-auto mb-2 text-red-500" />
            <div className="text-lg font-bold">{envData.temperature.toFixed(1)}°C</div>
            <div className="text-xs text-muted-foreground">Temperature</div>
          </div>

          <div className="text-center p-3 bg-white rounded-lg">
            <Droplets className="w-5 h-5 mx-auto mb-2 text-blue-500" />
            <div className="text-lg font-bold">{envData.humidity.toFixed(0)}%</div>
            <div className="text-xs text-muted-foreground">Humidity</div>
          </div>

          <div className="text-center p-3 bg-white rounded-lg">
            <Wind className="w-5 h-5 mx-auto mb-2 text-gray-500" />
            <div className="text-lg font-bold">{envData.windSpeed.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">Wind km/h</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Air Quality Index</span>
            <span className={`text-sm font-bold ${getStatusColor(envData.airQuality, { good: 70, warning: 50 })}`}>
              {envData.airQuality.toFixed(0)}/100
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
              style={{ width: `${envData.airQuality}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Biodiversity Index</span>
            <span className={`text-sm font-bold ${getStatusColor(envData.biodiversityIndex * 100, { good: 70, warning: 50 })}`}>
              {(envData.biodiversityIndex * 100).toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-green-500"
              style={{ width: `${envData.biodiversityIndex * 100}%` }}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Solar Radiation</span>
            <span className="text-sm font-bold text-yellow-600">
              {envData.solarRadiation.toFixed(0)} W/m²
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-yellow-500"
              style={{ width: `${(envData.solarRadiation / 1200) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-5 h-5 text-purple-600" />
            <span className="font-semibold text-purple-800">Quantum Field Analysis</span>
          </div>
          <div className="text-2xl font-bold text-purple-700 mb-1">
            {envData.quantumFluctuation.toFixed(3)} Hz
          </div>
          <p className="text-xs text-purple-600">
            Measuring quantum vacuum fluctuations affecting local consciousness field
          </p>
        </div>

        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-800">{alert}</span>
              </div>
            ))}
          </div>
        )}

        <div className="text-center text-xs text-muted-foreground">
          Real-time environmental monitoring with quantum-enhanced sensitivity
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalQuantumSensor;
