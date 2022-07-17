// BEM 规范
// block 代码块   element 元素  modifier 装饰
// m-button
// m-button__element
// m-button__element--disabled
// is-checked  is-enabled

export function createNameSpace(name: string) {
  const prefixName = `m-${name}`;
  return createBEM(prefixName);
}
export function createBEM(prefixName: string) {
  const b = (blockSuffix?: string) => _bem(prefixName, blockSuffix);
  const e = (element?: string) =>
    element ? _bem(prefixName, "", element) : "";
  const m = (modifier?: string) =>
    modifier ? _bem(prefixName, "", "", modifier) : "";
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(prefixName, blockSuffix, element) : "";
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(prefixName, blockSuffix, "", modifier) : "";
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(prefixName, "", element, modifier) : "";
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(prefixName, blockSuffix, element, modifier)
      : "";
  const is = (name: string, state: boolean) => (state ? `is-${name}` : "");
  return {
    b,
    e,
    m,
    be,
    bm,
    em,
    bem,
    is,
  };
}

/**
 * 前缀名字 m-button-box __element--modifier
 * @param prefixName
 * @param blockSuffix
 */
function _bem(
  prefixName: string,
  blockSuffix?: string,
  element?: string,
  modifier?: string
) {
  if (blockSuffix) {
    prefixName += `-${blockSuffix}`;
  }
  if (element) {
    prefixName += `__${element}`;
  }
  if (modifier) {
    prefixName += `--${modifier}`;
  }
  return prefixName;
}
