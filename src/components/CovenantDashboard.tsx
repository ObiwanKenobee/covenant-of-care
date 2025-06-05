
import React from 'react';
import { useCovenant } from '../contexts/CovenantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sun, Shield, Users, Globe, Calendar, Compass } from 'lucide-react';

const CovenantDashboard: React.FC = () => {
  const { terrainContext, governanceModel, currentUser } = useCovenant();

  const getContextIcon = () => {
    switch (terrainContext) {
      case 'desert': return <Sun className="w-6 h-6" />;
      case 'empire': return <Shield className="w-6 h-6" />;
      default: return <Compass className="w-6 h-6" />;
    }
  };

  const getContextColor = () => {
    switch (terrainContext) {
      case 'desert': return 'bg-gradient-to-br from-amber-500 to-orange-600';
      case 'empire': return 'bg-gradient-to-br from-purple-600 to-blue-700';
      default: return 'bg-gradient-to-br from-green-500 to-blue-600';
    }
  };

  const mockMetrics = {
    desert: {
      waterLevel: 85,
      solarCapacity: 92,
      migrationPaths: 3,
      sacredSites: 12
    },
    empire: {
      transparencyScore: 78,
      ethicsCompliance: 94,
      citizenWelfare: 89,
      heritagePreservation: 91
    }
  };

  const metrics = terrainContext === 'desert' ? mockMetrics.desert : mockMetrics.empire;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`${getContextColor()} rounded-xl p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getContextIcon()}
            <div>
              <h1 className="text-2xl font-bold capitalize">
                {terrainContext} Covenant
              </h1>
              <p className="text-white/80 capitalize">
                {governanceModel} governance
              </p>
            </div>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="mb-2">
              {currentUser?.role || 'Observer'}
            </Badge>
            <p className="text-sm text-white/60">
              Steward of the Sacred Digital
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(metrics).map(([key, value]) => (
          <Card key={key} className="transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground capitalize">
                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold">{value}%</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${getContextColor()}`}
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Sacred Territories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Monitor and protect sacred lands and migration paths
            </p>
            <Button variant="outline" className="w-full">
              View Map
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Ethics Council</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Consult with interfaith council on moral decisions
            </p>
            <Button variant="outline" className="w-full">
              Submit Query
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Sabbath Systems</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Schedule rest periods for all technological systems
            </p>
            <Button variant="outline" className="w-full">
              Configure Rest
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CovenantDashboard;
