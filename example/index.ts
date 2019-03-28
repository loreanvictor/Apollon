import { ApollonEditor, ApollonOptions, DiagramType, SVG } from '../source';

const container = document.getElementById('apollon')!;
let editor: ApollonEditor | null = null;
let options: ApollonOptions = {
  type: DiagramType.ClassDiagram,
  model: JSON.parse(window.localStorage.getItem('apollon')!),
};

export const onChange = (event: MouseEvent) => {
  const { name, value } = event.target as HTMLSelectElement;
  options = { ...options, [name]: value };
  render(container);
};

export const onSwitch = (event: MouseEvent) => {
  const { name, checked: value } = event.target as HTMLInputElement;
  options = { ...options, [name]: value };
  render(container);
};

export const save = () => {
  if (!editor) return;

  localStorage.setItem('apollon', JSON.stringify(editor.model));
  options = { ...options, model: editor.model };
  return options;
};

export const clear = () => {
  localStorage.removeItem('apollon');
  options = { ...options, model: undefined };
};

export const draw = (mode?: 'include' | 'exclude') => {
  if (!editor) return;

  const filter: string[] = [
    ...editor.model.interactive.elements,
    ...editor.model.interactive.relationships,
  ];

  const { svg }: SVG = editor.exportAsSVG(mode && { [mode]: filter });
  const svgBlob = new Blob([svg], { type: 'image/svg+xml' });
  const svgBlobURL = URL.createObjectURL(svgBlob);
  window.open(svgBlobURL);
};

const render = (container: HTMLElement) => {
  save();
  editor && editor.destroy();
  editor = new ApollonEditor(container, options);
};
render(container);
