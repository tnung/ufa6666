'use babel';

import Ufa6666View from './ufa6666-view';
import { CompositeDisposable } from 'atom';

export default {

  ufa6666View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ufa6666View = new Ufa6666View(state.ufa6666ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ufa6666View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ufa6666:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ufa6666View.destroy();
  },

  serialize() {
    return {
      ufa6666ViewState: this.ufa6666View.serialize()
    };
  },

  toggle() {
    console.log('Ufa6666 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
