const fs = require("fs");
const path = require("path");
//const fs = require('console');

const readDirectory = (dir, depth, options) => {
  // -L�I�v�V�����̒l�ƌ��݂̊K�w���r���āA�ǂݎ��s�v�ɂȂ����^�C�~���O�ōċA�𒆎~����
  if (options.level < depth) {
    return [];
  }

  const dirents = fs.readdirSync(dir, { withFileTypes: true });
  const nodes = [];
  dirents.forEach((dirent) => {
    if (dirent.name.startsWith(".")) {
      return;
    }

    if (dirent.isFile()) {
      nodes.push({ type: "file", name: dirent.name });
    } else if (dirent.isDirectory()) {
      nodes.push({
        type: "directory",
        name: dirent.name,
        children: readDirectory(
          path.join(dir, dirent.name),
          depth + 1,
          options
        ),
      });
    }
  });
  return nodes;
};

exports.read = (dir, options) => {
  let stat;

  try {
    stat = fs.statSync(dir);
  } catch (e) {
    throw new Error(`"${dir}" does not exist.`);
  }

  if (!stat.isDirectory()) {
    throw new Error(`"${dir}" cannot be opened as a directory.`);
  }

  // readDirectory�֐��ɏ����K�w��options��n��
  const root = {
    type: "directory",
    name: dir,
    children: readDirectory(dir, 1, options),
  };

  return root;
};
