
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Square, 
  Circle, 
  Type, 
  MousePointer,
  Trash2,
  Copy,
  Download,
  Save
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
  const [fileName, setFileName] = useState('Untitled');

  const tools = [
    { id: 'select', icon: MousePointer, label: 'Select' },
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
  ];

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
      setElements(elements.map(el => ({ ...el, selected: false })));
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'rectangle' || selectedTool === 'circle' || selectedTool === 'text') {
      const newElement: Element = {
        id: Date.now().toString(),
        type: selectedTool,
        x,
        y,
        width: selectedTool === 'text' ? 100 : 80,
        height: selectedTool === 'text' ? 24 : 80,
        content: selectedTool === 'text' ? 'Text' : undefined,
        selected: true
      };
      setElements([...elements.map(el => ({ ...el, selected: false })), newElement]);
      setSelectedTool('select');
    }
  };

  const saveDesign = () => {
    console.log('Saved:', { fileName, elements });
    alert('Saved!');
  };

  const exportDesign = () => {
    console.log('Exported:', { fileName, elements });
    alert('Exported!');
  };

  return (
    <div className="h-screen bg-white flex flex-col border">
      {/* Header */}
      <div className="h-10 border-b flex items-center justify-between px-3">
        <Input
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-32 h-6 text-sm border-none shadow-none p-1"
        />
        
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={saveDesign} className="h-6 px-2 text-xs">
            <Save className="w-3 h-3 mr-1" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={exportDesign} className="h-6 px-2 text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Toolbar */}
        <div className="w-12 border-r flex flex-col items-center py-2 gap-1">
          {tools.map((tool) => (
            <Button
              key={tool.id}
              variant={selectedTool === tool.id ? "default" : "ghost"}
              size="sm"
              className="w-8 h-8 p-0"
              onClick={() => setSelectedTool(tool.id as 'select' | 'rectangle' | 'circle' | 'text')}
            >
              <tool.icon className="w-3 h-3" />
            </Button>
          ))}
          
          <div className="border-t w-6 my-1" />
          
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={duplicateSelected}>
            <Copy className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" className="w-8 h-8 p-0" onClick={deleteSelected}>
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>

        {/* Canvas */}
        <div className="flex-1 bg-white relative overflow-hidden">
          <div
            className="w-full h-full relative cursor-crosshair"
            onClick={handleCanvasClick}
          >
            {elements.map((element) => (
              <div
                key={element.id}
                className={`absolute border cursor-move ${
                  element.selected ? 'border-black border-2' : 'border-gray-400'
                }`}
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
                  <div className="w-full h-full flex items-center justify-center text-xs">
                    {element.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Properties */}
        <div className="w-48 border-l p-2">
          <div className="text-xs font-medium mb-2">Elements</div>
          <div className="space-y-1">
            {elements.map((element) => (
              <div
                key={element.id}
                className={`p-1 text-xs cursor-pointer ${
                  element.selected ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}
                onClick={() => selectElement(element.id)}
              >
                {element.type}
              </div>
            ))}
          </div>
          
          {elements.some(el => el.selected) && (
            <div className="mt-4">
              <div className="text-xs font-medium mb-2">Properties</div>
              <div className="space-y-1 text-xs text-gray-600">
                {(() => {
                  const selected = elements.find(el => el.selected);
                  return selected ? (
                    <>
                      <div>X: {selected.x}</div>
                      <div>Y: {selected.y}</div>
                      <div>W: {selected.width}</div>
                      <div>H: {selected.height}</div>
                    </>
                  ) : null;
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FigmaUI;
