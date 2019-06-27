import { Quill } from 'react-quill';

const Inline = Quill.import('blots/inline');
const Parchment = Quill.import('parchment');

class BoldBlot extends Inline { }
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'b';
Quill.register('formats/bold', BoldBlot);

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic';
ItalicBlot.tagName = 'i';
Quill.register('formats/italic', ItalicBlot);

const Align = new Parchment.Attributor.Class('align', 'align');
Align.whitelist = ['center', 'right'];
Parchment.register(Align);
