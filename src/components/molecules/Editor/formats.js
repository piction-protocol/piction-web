import { Quill } from 'react-quill';

const Inline = Quill.import('blots/inline');
const Parchment = Quill.import('parchment');
const BlockEmbed = Quill.import('blots/block/embed');

class BoldBlot extends Inline { }
BoldBlot.blotName = 'bold';
BoldBlot.tagName = 'b';
Quill.register('formats/bold', BoldBlot);

class ItalicBlot extends Inline { }
ItalicBlot.blotName = 'italic';
ItalicBlot.tagName = 'i';
Quill.register('formats/italic', ItalicBlot);

class VideoBlot extends BlockEmbed {
  static blotName = 'video';

  static tagName = 'div';

  static className = 'video';

  static create(value) {
    const node = super.create(value);

    const child = document.createElement('iframe');
    child.setAttribute('frameborder', '0');
    child.setAttribute('allowfullscreen', true);
    child.setAttribute('src', value);
    node.appendChild(child);

    return node;
  }

  static value(domNode) {
    const iframe = domNode.querySelector('iframe');
    return iframe.getAttribute('src');
  }
}

Quill.register('formats/video', VideoBlot);

const Align = new Parchment.Attributor.Class('align', 'align');
Align.whitelist = ['center', 'right'];
Parchment.register(Align);
