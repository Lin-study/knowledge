/**
 * 用于将现在的menuList与后台的同步
 * @param {*} list 后台传过来的菜单
 */
export function syncMenuList(list) {
    // 思路：循环线上的所有menu根据名称获取线下menu，如果有属性修改，删除线下的menu，如果没有删除线上的menu
    for (let manuKey in list) {
      let menus = list[manuKey]
      let offMenus = menuList[manuKey]
      for (let i = 0; i < menus.length; i += 1) {
        let menu = menus[i]
        let offmenu = getMenuByName(offMenus, menu.name)
        if (!offmenu) {
          menus.splice(i, 1)
          i--
        } else {
          syncObject(menu, offmenu.item)
          offMenus.splice(offmenu.index, 1)
        }
      }
      if (offMenus) {
        menus.push.apply(menus, offMenus)
      }
    }
  }
  function getMenuByName(list, name) {
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].name === name) {
        return {
          item: list[i],
          index: i
        }
      }
    }
    return null
  }
  /**
   * @description 将离线的menuList 同步和线上的menuList同步
   * @param {*} obj1 线上的menu
   * @param {*} obj2 线下的menu
   */
  function syncObject(obj1, obj2) {
    obj1.icon = obj2.icon
    obj1.code = obj2.code
  }