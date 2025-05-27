
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Square, 
  Circle, 
  Type, 
  MousePointer, 
  Hand, 
  Minus,
  Play,
  Share,
  Users,
  Settings,
  Layers,
  Figma
} from 'lucide-react';

const FigmaUI = () => {
  const [selectedTool, setSelectedTool] = useState('pointer');
  const [selectedLayer, setSelectedLayer] = useState('rectangle-1');

  const tools = [
    { id: 'pointer', icon: MousePointer, label: 'Select' },
    { id: 'hand', icon: Hand, label: 'Hand' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Ellipse' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'line', icon: Minus, label: 'Line' },
  ];

  const layers = [
    { id: 'frame-1', name: 'Frame 1', type: 'frame', children: [
      { id: 'rectangle-1', name: 'Rectangle', type: 'rectangle' },
      { id: 'text-1', name: 'Hello World', type: 'text' },
      { id: 'circle-1', name: 'Ellipse', type: 'ellipse' },
    ]},
    { id: 'frame-2', name: 'Frame 2', type: 'frame', children: [] },
  ];

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Figma className="w-6 h-6 text-purple-400" />
            <span className="font-semibold">Figma Clone</span>
          </div>
          <div className="text-sm text-gray-400">
            Untitled Design
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Play className="w-4 h-4 mr-1" />
            Present
          </Button>
          <Button variant="ghost" size="sm">
            <Share className="w-4 h-4 mr-1" />
            Share
          </Button>
          <Button variant="ghost" size="sm">
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="bg-gray-800 border-r border-gray-700 p-2 flex flex-col space-y-1">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "secondary" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool(tool.id)}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
          ))}
        </div>

        {/* Layers Panel */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span className="text-sm font-medium">Layers</span>
            </div>
          </div>
          <div className="flex-1 p-2 space-y-1">
            {layers.map((layer) => (
              <div key={layer.id}>
                <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-700 cursor-pointer">
                  <div className="w-4 h-4 bg-blue-500 rounded"></div>
                  <span className="text-sm">{layer.name}</span>
                </div>
                {layer.children.map((child) => (
                  <div
                    key={child.id}
                    className={`flex items-center space-x-2 p-2 ml-4 rounded cursor-pointer ${
                      selectedLayer === child.id ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setSelectedLayer(child.id)}
                  >
                    <div className={`w-3 h-3 rounded ${
                      child.type === 'rectangle' ? 'bg-green-500' :
                      child.type === 'text' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`}></div>
                    <span className="text-sm">{child.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-800 bg-opacity-50" 
               style={{
                 backgroundImage: 'radial-gradient(circle, #374151 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
               }}>
          </div>
          
          {/* Canvas Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Card className="w-96 h-64 bg-white border-2 border-gray-300 relative">
              <div className="absolute top-4 left-4 w-24 h-16 bg-blue-500 rounded"></div>
              <div className="absolute top-4 left-32 text-black font-semibold">Hello World</div>
              <div className="absolute top-16 left-32 w-12 h-12 bg-orange-500 rounded-full"></div>
            </Card>
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 bg-gray-800 border-l border-gray-700 flex flex-col">
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Properties</span>
            </div>
          </div>
          <div className="flex-1 p-3 space-y-4">
            {selectedLayer && (
              <>
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Position</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" 
                           value="120" readOnly />
                    <input className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" 
                           value="80" readOnly />
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Size</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <input className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" 
                           value="96" readOnly />
                    <input className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm" 
                           value="64" readOnly />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Fill</label>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-6 h-6 bg-blue-500 rounded border border-gray-600"></div>
                    <span className="text-sm">#3B82F6</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 uppercase tracking-wide">Border Radius</label>
                  <input className="w-full bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm mt-1" 
                         value="4" readOnly />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaUI;
