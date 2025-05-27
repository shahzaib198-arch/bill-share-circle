
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Square, 
  Circle, 
  Type, 
  Move, 
  MousePointer,
  Trash2,
  Copy,
  Download,
  Save,
  Undo,
  Redo
} from 'lucide-react';

interface Element {
  id: string;
  type: 'rectangle' | 'circle' | 'text';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  selected: boolean;
}

const FigmaUI = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedTool, setSelectedTool] = useState<'select' | 'rectangle' | 'circle' | 'text'>('select');
  const [fileName, setFileName] = useState('Untitled Design');

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
  ];

  const addElement = (type: 'rectangle' | 'circle' | 'text') => {
    const newElement: Element = {
      id: Date.now().toString(),
      type,
      x: 100 + elements.length * 20,
      y: 100 + elements.length * 20,
      width: type === 'text' ? 120 : 100,
      height: type === 'text' ? 30 : 100,
      content: type === 'text' ? 'Text Element' : undefined,
      selected: false
    };
    setElements([...elements, newElement]);
  };

  const selectElement = (id: string) => {
    setElements(elements.map(el => ({
      ...el,
      selected: el.id === id
    })));
  };

  const deleteSelected = () => {
    setElements(elements.filter(el => !el.selected));
  };

  const duplicateSelected = () => {
    const selected = elements.find(el => el.selected);
    if (selected) {
      const duplicate: Element = {
        ...selected,
        id: Date.now().toString(),
        x: selected.x + 20,
        y: selected.y + 20,
        selected: false
      };
      setElements([...elements, duplicate]);
    }
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selectedTool === 'select') {
      // Deselect all elements
      setElements(elements.map(el => ({ ...el, selected: false })));
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool !== 'select') {
      const newElement: Element = {
        id: Date.now().toString(),
        type: selectedTool,
        x,
        y,
        width: selectedTool === 'text' ? 120 : 100,
        height: selectedTool === 'text' ? 30 : 100,
        content: selectedTool === 'text' ? 'New Text' : undefined,
        selected: true
      };
      setElements([...elements.map(el => ({ ...el, selected: false })), newElement]);
      setSelectedTool('select');
    }
  };

  const saveDesign = () => {
    console.log('Saving design:', { fileName, elements });
    alert('Design saved!');
  };

  const exportDesign = () => {
    console.log('Exporting design:', { fileName, elements });
    alert('Design exported!');
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="h-12 bg-gray-50 border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Input
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="w-48 h-8 text-sm border-0 bg-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={saveDesign}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={exportDesign}>
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Toolbar */}
        <div className="w-16 bg-gray-50 border-r flex flex-col items-center py-4 gap-2">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className="w-10 h-10 p-0"
              onClick={() => setSelectedTool(tool.id as any)}
            >
              <tool.icon className="w-4 h-4" />
            </Button>
          ))}
          
          <div className="border-t w-8 my-2" />
          
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0" onClick={duplicateSelected}>
            <Copy className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="w-10 h-10 p-0" onClick={deleteSelected}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-gray-100 relative overflow-hidden">
          <div
            className="w-full h-full relative cursor-crosshair"
            onClick={handleCanvasClick}
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '20px 20px'
            }}
          >
            {/* Canvas Elements */}
            {elements.map((element) => (
              <div
                key={element.id}
                className={`absolute border-2 ${
                  element.selected ? 'border-blue-500' : 'border-gray-400'
                } cursor-move`}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  backgroundColor: element.type === 'text' ? 'transparent' : 'white',
                  borderRadius: element.type === 'circle' ? '50%' : '0',
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  selectElement(element.id);
                }}
              >
                {element.type === 'text' && (
                  <div className="w-full h-full flex items-center justify-center text-sm">
                    {element.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Properties Panel */}
        <div className="w-64 bg-gray-50 border-l p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Elements</h3>
              <div className="space-y-1">
                {elements.map((element) => (
                  <div
                    key={element.id}
                    className={`p-2 text-sm cursor-pointer rounded ${
                      element.selected ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => selectElement(element.id)}
                  >
                    {element.type} - {element.content || `${element.width}x${element.height}`}
                  </div>
                ))}
              </div>
            </div>
            
            {elements.some(el => el.selected) && (
              <div>
                <h3 className="text-sm font-medium mb-2">Properties</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  {(() => {
                    const selected = elements.find(el => el.selected);
                    return selected ? (
                      <>
                        <div>X: {selected.x}px</div>
                        <div>Y: {selected.y}px</div>
                        <div>W: {selected.width}px</div>
                        <div>H: {selected.height}px</div>
                      </>
                    ) : null;
                  })()}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FigmaUI;
