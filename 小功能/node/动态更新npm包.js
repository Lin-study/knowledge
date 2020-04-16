/* eslint-disable semi, one-var */
/**
 * 加载uino模块
 * @param {String} moduleName 模块名
 * @param {String} versionStr 指定下载的版本号，不指定则会下载最新版
 */
function downloadUinoModule(moduleName, versionStr) {
  const pathInfo = {
    hostname: 'npm.udolphin.com',
    path: `/${moduleName}`,
    port: 443
  };
  const port = pathInfo.port === 443 ? '' : (':' + pathInfo.port);
  const getUrl = () => `https://${pathInfo.hostname}${port}${pathInfo.path}`;
  const getFile = version => `${getUrl()}/-/${moduleName}-${version}.tgz`;
  const msgFailed = `"${moduleName}" updated failed!`;
  // 通过http 的 get 请求获取到安装包
  const httpRequest = (pathInfo, setEncoding) => {
    return new Promise((resolve, reject) => {
      https.get(pathInfo, res => {
        let data = '';
        if (typeof setEncoding === 'function') setEncoding(res);
        res.on('data', chunk => {
          data += chunk;
        });
        res.on('end', () => {
          resolve(data);
        });
      }).on('error', (err) => {
        reject(err);
      });
    });
  };
  const destinationPath = `../node_modules/${moduleName}`;
  const cleanFolder = (dstFolder, disableInfo) => {
    try {
      if (!fs.existsSync(dstFolder)) {
        if (!disableInfo) fs.mkdirSync(dstFolder);
        return;
      }
      fs.readdirSync(dstFolder).forEach(f => {
        f = dstFolder + '/' + f;
        var info = fs.statSync(f);
        if (info.isDirectory()) {
          cleanFolder(f, true);
          fs.rmdirSync(f);
        } else if (fs.existsSync(f)) {
          fs.unlinkSync(f);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };
  const copy = function (src, dst) {
    return new Promise((resolve, reject) => {
      let ok = false;
      let length = 0;
      fs.readdir(src, function (err, paths) {
        if (err) return reject(err);
        const stat = fs.stat;
        const o = {};
        const handler = () => {
          if (ok && !Object.values(o).some(v => v)) {
            setTimeout(resolve, 1000);
          }
        };
        length = paths.length;
        paths.forEach(function (path) {
          const _src = src + '/' + path;
          const _dst = dst + '/' + path;
          o[_src] = true;
          stat(_src, function (err, st) {
            if (err) {
              console.log(err);
              o[_src] = null;
              return handler();
            }
            if (st.isFile()) {
              fs.writeFile(_dst, fs.readFileSync(_src),
                err => {
                  if (err) console.log('write error', _src);
                  o[_src] = null;
                  handler();
                }
              );
            } else if (st.isDirectory()) {
              fs.exists(_dst, function (exists) {
                if (exists) {
                  copy(_src, _dst).then(() => {
                    o[_src] = null;
                    handler();
                  });
                } else {
                  fs.mkdir(_dst, function () {
                    copy(_src, _dst).then(() => {
                      o[_src] = null;
                      handler();
                    });
                  })
                }
              });
            }
          });
        });
        if (!length) resolve();
      });
      ok = true;
    });
  };
  // 判断版本
  const isLatest = (dstFolder, version) => new Promise(resolve => {
    const filePackage = path.join(dstFolder, 'package.json');
    let isEqual = false;
    fs.exists(filePackage, exists => {
      if (!exists) return resolve(isEqual);
      fs.readFile(filePackage, function (err, data) {
        if (err) {
          console.log(err);
          resolve(isEqual);
        } else {
          try {
            isEqual = JSON.parse(data.toString()).version === version;
          } finally {
            resolve(isEqual);
          }
        }
      });
    });
  });
  const completeMsg = `Complete updating module ${moduleName}!`;
  return new Promise(resolve => {
    console.log(`Start updating module ${moduleName} ...`);
    (versionStr ? Promise.resolve(JSON.stringify({
      'dist-tags': {
        latest: versionStr
      }
    })) : httpRequest(pathInfo)).then(data => {
      if (!data) return console.log(msgFailed);
      data = JSON.parse(data.replace(/^\s*|\s*$/, ''));
      const version = data['dist-tags'].latest;
      const dstFolder = path.join(__dirname, destinationPath);
      return isLatest(dstFolder, version).then(isLatest => {
        if (isLatest) return console.log(`Version: ${version}, module ${moduleName} is already up to date!`);
        console.log('Download file', getFile(version), '...');
        return httpRequest(Object.assign({}, pathInfo, {
          path: pathInfo.path + `/-/${moduleName}-${version}.tgz`,
          streaming: true
        }), res => {
          res.setEncoding('binary');
        }).then(data => {
          console.log(`Download module ${moduleName} finished!`);
          cleanFolder(dstFolder);
          return compressing.tgz.uncompress(Buffer.from(Buffer.from(data, 'ascii')), dstFolder).then(() => {
            const packageFolder = `${dstFolder}/package`;
            return copy(packageFolder, dstFolder).then(() => {
              cleanFolder(packageFolder);
              fs.rmdir(packageFolder, err => {
                if (err) console.log(err);
              });
            });
          });
        });
      });
    }).then(() => {
      console.log(completeMsg);
      resolve();
    }, err => {
      console.log(err);
      console.log(completeMsg);
      resolve();
    });
  });
}
// 更新uino模块
exports.updateUinoI18nModule = () => {
  return Promise.all(config.uinoModules.map(module => {
    const [moduleName, version] = module.split('@');
    return downloadUinoModule(moduleName, version);
  }));
}