// binary search tree

// binary search tree class
class Tree {
  constructor() {
    this.root = null;
  }
  // function to sort array
  sortArr(arr) {
    if (arr.length === 0) return arr;
    arr = arr.sort(function (a, b) {
      return a * 1 - b * 1;
    });
    const sorted = [arr[0]];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] !== arr[i]) {
        sorted.push(arr[i]);
      }
    }
    return sorted;
  }
  // function to build binary search tree
  buildTree(arr, start, end) {
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);

    const left = this.buildTree(arr, start, mid - 1);
    const right = this.buildTree(arr, mid + 1, end);

    const root = new Node(arr[mid], left, right);

    return root;
  }
  // function to insert new data
  insert(data) {
    let newNode = new Node(data, null, null);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertRec(this.root, newNode);
    }
  }
  insertRec(rootNode, newNode) {
    if (newNode.data < rootNode.data) {
      if (rootNode.left === null) {
        rootNode.left = newNode;
      } else {
        this.insertRec(rootNode.left, newNode);
      }
    } else {
      if (rootNode.right === null) {
        rootNode.right = newNode;
      } else {
        this.insertRec(rootNode.right, newNode);
      }
    }
  }
  // function to delete a node
  delete(value) {
    this.root = this.deleteRec(this.root, value);
  }
  deleteRec(node, value) {
    // node is null
    if (node === null) {
      return null;
      //recursive calls
    } else if (value < node.data) {
      node.left = this.deleteRec(node.left, value);
      return node;
    } else if (value > node.data) {
      node.right = this.deleteRec(node.right, value);
      return node;
    } else {
      // node has no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // node has one child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }
      // node has two children
      else {
        let parent = node;
        let child = node.right;
        while (child.left !== null) {
          parent = child;
          child = child.left;
        }
        if (parent !== node) {
          parent.left = child.right;
        } else {
          parent.right = child.right;
        }
        node.data = child.data;
        return node;
      }
    }
  }
  // function to find a node
  find(value) {
    return this.findRec(this.root, value);
  }
  findRec(node, value) {
    if (node === null || node.data === value) {
      return node;
    }
    if (node.data > value) {
      return this.findRec(node.left, value);
    } else {
      return this.findRec(node.right, value);
    }
  }
  // function to perform level order traversal and return array
  levelOrder() {
    return this.levelOrderRec(this.root);
  }
  levelOrderRec(node) {
    if (node === null) {
      return [];
    }
    let queue = [];
    queue.push(node);
    let arr = [];
    while (queue.length != 0) {
      let element = queue.shift();
      arr.push(element.data);
      if (element.left != null) {
        queue.push(element.left);
      }
      if (element.right != null) {
        queue.push(element.right);
      }
    }
    return arr;
  }
  // function to perform preorder traversal and return array
  preorder() {
    return this.preorderRec(this.root);
  }
  preorderRec(node) {
    let stack = [];
    if (node !== null) {
      stack.push(
        node.data,
        ...this.preorderRec(node.left),
        ...this.preorderRec(node.right)
      );
    }
    return stack;
  }
  // function to perform inorder traversal and return array
  inorder() {
    return this.inorderRec(this.root);
  }
  inorderRec(node) {
    let stack = [];
    if (node !== null) {
      stack.push(
        ...this.inorderRec(node.left),
        node.data,
        ...this.inorderRec(node.right)
      );
    }
    return stack;
  }
  // function to perform postorder traversal and return array
  postorder() {
    return this.postorderRec(this.root);
  }
  postorderRec(node) {
    let stack = [];
    if (node !== null) {
      stack.push(
        ...this.postorderRec(node.left),
        ...this.postorderRec(node.right),
        node.data
      );
    }
    return stack;
  }
  // function to return height of binary search tree
  height(value) {
    return this.heightRec(this.find(value));
  }
  heightRec(node) {
    if (node === null || (node.left === null && node.right === null)) {
      return 0;
    }
    let leftHeight = this.heightRec(node.left);
    let rightHeight = this.heightRec(node.right);
    if (leftHeight > rightHeight) {
      return leftHeight + 1;
    } else {
      return rightHeight + 1;
    }
  }
  // function to return depth of binary search tree
  depth(value) {
    return this.depthRec(this.root, value);
  }
  depthRec(node, value) {
    if (node === null) {
      return null;
    }

    if (node === null) {
      return node;
    }
    if (node.data === value) {
      return 0;
    }
    if (node.data > value) {
      let leftDepth = this.depthRec(node.left, value);
      return leftDepth + 1;
    } else {
      let rightDepth = this.depthRec(node.right, value);
      return rightDepth + 1;
    }
  }
  // function to determine if binary search tree is balanced
  isBalanced() {
    return this.isBalancedRec(this.root);
  }
  isBalancedRec(node) {
    let heightLeft = this.heightRec(node.left);
    let heightRight = this.heightRec(node.right);
    if (heightLeft - heightRight > 1 || heightRight - heightLeft > 1) {
      return false;
    } else {
      return true;
    }
  }
  // function to rebalance binary search tree
  rebalance() {
    return this.rebalanceRec(this.root);
  }
  rebalanceRec(node) {
    if (this.isBalanced(node) === false) {
      let arr = this.levelOrder();
      let sortedArr = this.sortArr(arr);
      this.root = this.buildTree(sortedArr, 0, sortedArr.length - 1);
      return this.root;
    }
  }
}

// node of binary search tree class
class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

// script to test
function script() {
  // generate numbers
  let test = [];
  for (let i = 0; i < 10; i++) {
    test.push(Math.floor(Math.random() * 100));
  }
  console.log(test);

  // build tree
  const bst = new Tree();
  let sortedArr = bst.sortArr(test);
  bst.root = bst.buildTree(sortedArr, 0, sortedArr.length - 1);

  // pretty print
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  prettyPrint(bst.root);

  // confirm tree is balanced
  console.log(bst.isBalanced());

  // log all elements in level order, preorder, inorder, and postorder
  console.log(bst.levelOrder());
  console.log(bst.preorder());
  console.log(bst.inorder());
  console.log(bst.postorder());

  // unbalance tree by adding several numbers > 100
  bst.insert(100);
  bst.insert(200);
  bst.insert(300);
  bst.insert(400);
  bst.insert(500);
  prettyPrint(bst.root);

  // confirm tree is unbalanced
  console.log(bst.isBalanced());

  // rebalance tree
  prettyPrint(bst.rebalance());

  // confirm tree is unbalanced
  console.log(bst.isBalanced());

  // log all elements in level order, preorder, inorder, and postorder
  console.log(bst.levelOrder());
  console.log(bst.preorder());
  console.log(bst.inorder());
  console.log(bst.postorder());
}
script();
