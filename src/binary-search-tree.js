const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTreeHelper {

  addWithin(node, data) {
    if (!node) { return new Node(data); }
    if (node.data === data) { return node; }
    if (data < node.data) { node.left = this.addWithin(node.left, data); }
    else { node.right = this.addWithin(node.right, data); }
    return node;
  }

  searchWithin(node, data) {
    if (!node) { return false; }
    if (node.data === data) { return true; }
    return data < node.data ? this.searchWithin(node.left, data) : this.searchWithin(node.right, data);
  }

  removeNode(node, data) {
    if (!node) { return null; }
    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else if (node.data < data) {
      node.right = this.removeNode(node.right, data);
      return node;
    } else {
      if (!node.left && !node.right) { return null; }

      // has right child
      if (!node.left) {
        node = node.right;
        return node;
      }

      // has left child
      if (!node.right) {
        node = node.left;
        return node;
      }

      // has both children
      let minFromRight = node.right;
      while (minFromRight.left) {
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data;
      node.right = this.removeNode(node.right, minFromRight.data);
      return node;
    }
  }

  search(node, data) {
    if (!node) { return null; }
    if (node.data === data) { return node; }
    return data < node.data ? this.search(node.left, data) : this.search(node.right, data);
  }
}
class BinarySearchTree extends BinarySearchTreeHelper {

  constructor() {
    super();
    this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    this._root = this.addWithin(this._root, data);
  }

  has(data) {
    return this.searchWithin(this._root, data);
  }

  find(data) {
    return this.search(this._root, data);
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  min() {
    let node = this._root;
    while (node.left) {
      node = node.left;
    }
    return node.data;
  }

  max() {
    let node = this._root;
    while (node.right) {
      node = node.right;
    }
    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};