export type TODO_any = any;

// �S�m�[�h�̋��ʌ^
interface BaseNode<T>{
    type: T;
    name: string;
}

// �t�@�C����type��name�݂̂�����
export interface FileNode extends BaseNode<'file'>{}

// �f�B���N�g���͒ǉ��Ńm�[�h�̔z�������
export interface DirectoryNode extends BaseNode<'directory'>{
    children: TreeNode[];
}
// �V���{���b�N�����N�p�̃m�[�h��`
export interface SymlinkNode extends BaseNode<'symlink'>{
    link: string;
}

// toy-tree�ň����S�m�[�h�̂����ꂩ�̌^��\��union�^
export type TreeNode = FileNode | DirectoryNode | SymlinkNode;

// options
export interface Options{
    level: number;
}

