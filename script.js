class Node{
    constructor(value){
        this.value = value;
        this.left = null;
        this.right= null;
    }
}

class Tree{
    constructor(){
        this.root = null;
    }

    isEmpty(){
        return this.root===null;
    }

    insert(value) {
        // Inserts new Node into the Tree
        const newNode = new Node(value);
        if (this.isEmpty()) {
          this.root = newNode;
        } else {
          this.insertNode(this.root, newNode);
        }
      }
    
      insertNode(root, newNode) {
        if (newNode.value < root.value) {
          if (root.left === null) {
            root.left = newNode;
          } else {
            this.insertNode(root.left, newNode);
          }
        } else {
          if (root.right === null) {
            root.right = newNode;
          } else {
            this.insertNode(root.right, newNode);
          }
        }
      }

      delete(value) {
        this.root = this.deleteNode(this.root, value);
      }
    
      deleteNode(root, value) {
        // Delete selected Node
        if (root === null) {
          return root;
        }
        if (value < root.value) {
          root.left = this.deleteNode(root.left, value);
        } else if (value > root.value) {
          root.right = this.deleteNode(root.right, value);
        } else {
          if (!root.left && !root.right) {
            return null;
          }
          if (!root.left) {
            return root.right;
          } else if (!root.right) {
            return root.left;
          }
          root.value = this.min(root.right);
          root.right = this.deleteNode(root.right, root.value);
        }
        return root;
      }

      find(root, value) {
        // Returns the node with a given value
        if (!root) {
          return false;
        }
        if (root.value === value) {
          return root.value;
        } else if (value < root.value) {
          return this.find(root.left, value);
        } else {
          return this.find(root.right, value);
        }
      }

      levelOrder() {
        // Traverses the tree in Breadth-first level order
        const queue = [];
        queue.push(this.root);
        while (queue.length) {
          let curr = queue.shift();
          console.log(curr.value);
          if (curr.left) {
            queue.push(curr.left);
          }
          if (curr.right) {
            queue.push(curr.right);
          }
        }
      }

      // Next Three (3) functions traverse the tree in Deapth-first order
      inOrder(root) {
        if (root) {
          this.inOrder(root.left);
          console.log(root.value);
          this.inOrder(root.right);
        }
      }
    
      preOrder(root) {
        if (root) {
          console.log(root.value);
          this.preOrder(root.left);
          this.preOrder(root.right);
        }
      }
    
      postOrder(root) {
        if (root) {
          this.postOrder(root.left);
          this.postOrder(root.right);
          console.log(root.value);
        }
      }

      height(node) {
        /* Accepts a node and returns its height.
        Height is defined as the number of edges in longest path from a given node to a leaf node */
        if (!node) {
          return 0;
        } else {
          const leftHeight = this.height(node.left);
          const rightHeight = this.height(node.right);
          return Math.max(leftHeight, rightHeight) + 1;
        }
      }

    prettyPrint(node, prefix = '', isLeft = true) {
        // Visualizes the Biary Search Tree in a structured format
        if (node === null) {
           return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
      }
      isBalanced(root) {
        /* Checks if the tree is balanced.
        Balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1 */
        if (root === null) return false;
  
        let left = root.left;
        let right = root.right;
    
        if (Math.abs(this.height(left) - this.height(right)) > 1) {
          console.log(false);
        } else {
          console.log(true);
        }
      }
}

const bst = new Tree();
console.log(bst.isEmpty());
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);
bst.insert(14);
bst.insert(17);
bst.insert(2);
console.log(bst.find(bst.root, 10));
console.log(bst.find(bst.root, 7));
bst.inOrder();
bst.preOrder();
bst.postOrder();
bst.levelOrder();
console.log(bst.height(bst.root));
bst.prettyPrint(bst.root);
bst.isBalanced(bst.root)