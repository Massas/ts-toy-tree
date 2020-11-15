export type TODO_any = any;

// 全ノードの共通型
interface BaseNode<T>{
    type: T;
    name: string;
}

// ファイルはtypeとnameのみを持つ
export interface FileNode extends BaseNode<'file'>{}

// ディレクトリは追加でノードの配列を持つ
export interface DirectoryNode extends BaseNode<'directory'>{
    children: TreeNode[];
}

// toy-treeで扱う全ノードのいずれかの型を表すunion型
export type TreeNode = FileNode | DirectoryNode;

// options
export interface Options{
    level: number;
}