import * as React from 'react';
import { Ripple } from 'primereact/ripple';
import { ObjectUtils, classNames, IconUtils } from 'primereact/utils';

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

var DockBase = {
  defaultProps: {
    __TYPE: 'Dock',
    id: null,
    style: null,
    className: null,
    model: null,
    position: 'bottom',
    magnification: true,
    header: null,
    footer: null,
    children: undefined
  },
  getProps: function getProps(props) {
    return ObjectUtils.getMergedProps(props, DockBase.defaultProps);
  },
  getOtherProps: function getOtherProps(props) {
    return ObjectUtils.getDiffProps(props, DockBase.defaultProps);
  }
};

var Dock = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(function (inProps, ref) {
  var props = DockBase.getProps(inProps);
  var _React$useState = React.useState(-3),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    currentIndexState = _React$useState2[0],
    setCurrentIndexState = _React$useState2[1];
  var elementRef = React.useRef(null);
  var onListMouseLeave = function onListMouseLeave() {
    setCurrentIndexState(-3);
  };
  var onItemMouseEnter = function onItemMouseEnter(index) {
    setCurrentIndexState(index);
  };
  var onItemClick = function onItemClick(e, item) {
    if (item.command) {
      item.command({
        originalEvent: e,
        item: item
      });
    }
    e.preventDefault();
  };
  var createItem = function createItem(item, index) {
    if (item.visible === false) {
      return null;
    }
    var disabled = item.disabled,
      _icon = item.icon,
      label = item.label,
      template = item.template,
      url = item.url,
      target = item.target;
    var className = classNames('p-dock-item', {
      'p-dock-item-second-prev': currentIndexState - 2 === index,
      'p-dock-item-prev': currentIndexState - 1 === index,
      'p-dock-item-current': currentIndexState === index,
      'p-dock-item-next': currentIndexState + 1 === index,
      'p-dock-item-second-next': currentIndexState + 2 === index
    });
    var contentClassName = classNames('p-dock-action', {
      'p-disabled': disabled
    });
    var iconClassName = classNames('p-dock-action-icon', _icon);
    var icon = IconUtils.getJSXIcon(_icon, {
      className: 'p-dock-action-icon'
    }, {
      props: props
    });
    var content = /*#__PURE__*/React.createElement("a", {
      href: url || '#',
      role: "menuitem",
      className: contentClassName,
      target: target,
      "data-pr-tooltip": label,
      onClick: function onClick(e) {
        return onItemClick(e, item);
      }
    }, icon, /*#__PURE__*/React.createElement(Ripple, null));
    if (template) {
      var defaultContentOptions = {
        onClick: function onClick(e) {
          return onItemClick(e, item);
        },
        className: contentClassName,
        iconClassName: iconClassName,
        element: content,
        props: props,
        index: index
      };
      content = ObjectUtils.getJSXElement(template, item, defaultContentOptions);
    }
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: className,
      role: "none",
      onMouseEnter: function onMouseEnter() {
        return onItemMouseEnter(index);
      }
    }, content);
  };
  var createItems = function createItems() {
    return props.model ? props.model.map(createItem) : null;
  };
  var createHeader = function createHeader() {
    if (props.header) {
      var _header = ObjectUtils.getJSXElement(props.header, {
        props: props
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-dock-header"
      }, _header);
    }
    return null;
  };
  var createList = function createList() {
    var items = createItems();
    return /*#__PURE__*/React.createElement("ul", {
      className: "p-dock-list",
      role: "menu",
      onMouseLeave: onListMouseLeave
    }, items);
  };
  var createFooter = function createFooter() {
    if (props.footer) {
      var _footer = ObjectUtils.getJSXElement(props.footer, {
        props: props
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "p-dock-footer"
      }, _footer);
    }
    return null;
  };
  React.useImperativeHandle(ref, function () {
    return {
      props: props,
      getElement: function getElement() {
        return elementRef.current;
      }
    };
  });
  var otherProps = DockBase.getOtherProps(props);
  var className = classNames("p-dock p-component p-dock-".concat(props.position), {
    'p-dock-magnification': props.magnification
  }, props.className);
  var header = createHeader();
  var list = createList();
  var footer = createFooter();
  return /*#__PURE__*/React.createElement("div", _extends({
    id: props.id,
    ref: elementRef,
    className: className,
    style: props.style
  }, otherProps), /*#__PURE__*/React.createElement("div", {
    className: "p-dock-container"
  }, header, list, footer));
}));
Dock.displayName = 'Dock';

export { Dock };
