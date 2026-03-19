import React, { useState, createContext, useContext } from 'react';

// =========================================================================
// ⚠️ 预览环境运行提示 ⚠️
// 当前为直观展示“淡白”风格 Menu 组件的 React 预览代码。
// 完整的 Vue 源码及 Less 样式文件，请滑动到代码最底部的注释中提取！
// =========================================================================

const paleWhiteMenuStyles = `
/* 页面预览背景（衬托淡白风格） */
.preview-container {
    min-height: 100vh;
    background-color: #f7f8fa;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 40px;
    font-family: system-ui, -apple-system, sans-serif;
}

.preview-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.preview-title {
    width: 100%;
    font-size: 15px;
    font-weight: 600;
    color: #2c3034;
    margin: 0;
    padding-left: 8px;
    border-left: 3px solid #2c3034;
}

/* =======================================
   淡白菜单核心 CSS (对应 Less) 
======================================= */
.sy-menu {
    margin: 0;
    padding: 0;
    list-style: none;
    background-color: #ffffff;
    color: #6a7076; /* 中性灰 */
    font-size: 14px;
    border: 1px solid rgba(224, 228, 232, 0.7);
    transition: background 0.3s, width 0.3s;
    box-sizing: border-box;
}

.sy-menu-item {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
}

.sy-menu-item-icon {
    margin-right: 10px;
    display: inline-flex;
    align-items: center;
    font-size: 16px;
    opacity: 0.8;
}

.sy-menu-item:hover,
.sy-submenu-title:hover {
    color: #2c3034; /* 悬浮深碳灰 */
}

/* 禁用状态 */
.sy-menu-item.is-disabled {
    color: #c8ccd0;
    cursor: not-allowed;
    background: transparent !important;
}
.sy-menu-item.is-disabled::before {
    display: none !important;
}

/* =======================================
   水平菜单 (Horizontal)
======================================= */
.sy-menu-horizontal {
    display: flex;
    align-items: center;
    border-radius: 12px;
    padding: 0 16px;
    box-shadow: 0 4px 16px -6px rgba(140, 144, 150, 0.05);
}

.sy-menu-horizontal > .sy-menu-item,
.sy-menu-horizontal > .sy-submenu > .sy-submenu-title {
    padding: 0 20px;
    height: 52px;
    border-radius: 6px;
    margin: 4px 2px;
}

.sy-menu-horizontal > .sy-menu-item:hover,
.sy-menu-horizontal > .sy-submenu:hover > .sy-submenu-title {
    background-color: #f0f2f4; /* 极浅悬浮背景 */
}

/* 水平激活状态 */
.sy-menu-horizontal .sy-menu-item.is-active {
    color: #2c3034;
    font-weight: 600;
    background-color: transparent;
    box-shadow: inset 0 -2px 0 #2c3034; /* 使用 inset box-shadow 替代 border 避免抖动 */
    border-radius: 0;
}

/* 水平下拉子菜单 */
.sy-menu-horizontal .sy-submenu {
    position: relative;
}

.sy-menu-horizontal .sy-submenu-title {
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sy-menu-horizontal .sy-submenu-arrow {
    margin-left: 8px;
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.6;
}

.sy-menu-horizontal .sy-submenu:hover .sy-submenu-arrow {
    transform: rotate(180deg);
}

.sy-menu-horizontal .sy-submenu-popup {
    position: absolute;
    top: 100%;
    left: 0;
    min-width: 140px;
    background: #ffffff;
    border: 1px solid rgba(224, 228, 232, 0.7);
    border-radius: 10px;
    padding: 8px;
    box-shadow: 0 12px 32px -8px rgba(140, 144, 150, 0.12), 0 4px 12px -4px rgba(140, 144, 150, 0.08);
    z-index: 1000;
    
    /* 悬浮弹出动画 */
    visibility: hidden;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.sy-menu-horizontal .sy-submenu:hover .sy-submenu-popup {
    visibility: visible;
    opacity: 1;
    transform: translateY(4px); /* 留一点间隙 */
}

.sy-menu-horizontal .sy-submenu-popup .sy-menu-item {
    height: 40px;
    padding: 0 16px;
    border-radius: 6px;
    margin-bottom: 2px;
}
.sy-menu-horizontal .sy-submenu-popup .sy-menu-item:hover {
    background-color: #f0f2f4;
}
.sy-menu-horizontal .sy-submenu-popup .sy-menu-item.is-active {
    color: #2c3034;
    font-weight: 600;
    background-color: #f7f8fa;
    box-shadow: none;
}


/* =======================================
   垂直菜单 (Vertical)
======================================= */
.sy-menu-vertical {
    width: 240px;
    border-radius: 16px;
    padding: 12px 0;
    box-shadow: 0 4px 16px -6px rgba(140, 144, 150, 0.05);
}

.sy-menu-vertical .sy-menu-item,
.sy-menu-vertical .sy-submenu-title {
    height: 44px;
    padding: 0 20px;
    margin: 4px 12px;
    border-radius: 8px;
}

.sy-menu-vertical .sy-menu-item:hover,
.sy-menu-vertical .sy-submenu-title:hover {
    background-color: #f0f2f4;
}

/* 垂直激活状态 */
.sy-menu-vertical .sy-menu-item.is-active {
    color: #2c3034;
    font-weight: 600;
    background-color: #f4f5f7;
}

/* 左侧指示线 */
.sy-menu-vertical .sy-menu-item::before {
    content: '';
    position: absolute;
    left: -12px; /* 移动到最左侧边缘 */
    top: 50%;
    transform: translateY(-50%) scaleY(0);
    width: 3px;
    height: 20px;
    background-color: #2c3034;
    border-radius: 0 4px 4px 0;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}
.sy-menu-vertical .sy-menu-item.is-active::before {
    transform: translateY(-50%) scaleY(1);
}

/* 垂直折叠子菜单 */
.sy-menu-vertical .sy-submenu-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sy-menu-vertical .sy-submenu-arrow {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    opacity: 0.6;
}
.sy-menu-vertical .sy-submenu.is-open > .sy-submenu-title .sy-submenu-arrow {
    transform: rotate(180deg);
}

.sy-menu-vertical .sy-submenu-inline {
    overflow: hidden;
    transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    display: grid;
    grid-template-rows: 0fr;
}
.sy-menu-vertical .sy-submenu.is-open > .sy-submenu-inline {
    grid-template-rows: 1fr;
}

.sy-menu-vertical .sy-submenu-inline-inner {
    min-height: 0; /* 让 CSS Grid 动画生效的关键 */
}

/* 内嵌子菜单缩进 */
.sy-menu-vertical .sy-submenu-inline .sy-menu-item {
    padding-left: 46px; /* 缩进 */
    height: 40px;
}
.sy-menu-vertical .sy-submenu-inline .sy-menu-item::before {
    left: -12px; /* 保持指示线在最左侧外边缘 */
}
`;

// ==========================================
// React 模拟组件逻辑
// ==========================================

const MenuContext = createContext<{
    activeKey: string;
    onSelect: (key: string) => void;
    mode: 'horizontal' | 'vertical';
    openKeys: string[];
    onOpenChange: (key: string) => void;
}>({
    activeKey: '',
    onSelect: () => {},
    mode: 'vertical',
    openKeys: [],
    onOpenChange: () => {}
});

const SyMenu = ({ children, mode = 'vertical', defaultActive = '', style }: any) => {
    const [activeKey, setActiveKey] = useState(defaultActive);
    const [openKeys, setOpenKeys] = useState<string[]>(['sub1']); // 默认展开测试

    const handleOpenChange = (key: string) => {
        setOpenKeys(prev => 
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    return (
        <MenuContext.Provider value={{ activeKey, onSelect: setActiveKey, mode, openKeys, onOpenChange: handleOpenChange }}>
            <ul className={`sy-menu sy-menu-${mode}`} style={style}>
                {children}
            </ul>
        </MenuContext.Provider>
    );
};

const SyMenuItem = ({ id, icon, disabled, children }: any) => {
    const context = useContext(MenuContext);
    const isActive = context.activeKey === id;
    
    return (
        <li 
            className={`sy-menu-item ${isActive ? 'is-active' : ''} ${disabled ? 'is-disabled' : ''}`}
            onClick={() => !disabled && context.onSelect(id)}
        >
            {icon && <span className="sy-menu-item-icon">{icon}</span>}
            <span className="sy-menu-item-content">{children}</span>
        </li>
    );
};

const SySubMenu = ({ id, icon, title, children }: any) => {
    const context = useContext(MenuContext);
    const isOpen = context.openKeys.includes(id);

    const isHorizontal = context.mode === 'horizontal';

    const titleNode = (
        <div 
            className="sy-submenu-title"
            onClick={() => !isHorizontal && context.onOpenChange(id)}
        >
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {icon && <span className="sy-menu-item-icon">{icon}</span>}
                <span>{title}</span>
            </div>
            <svg className="sy-submenu-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
        </div>
    );

    if (isHorizontal) {
        return (
            <li className="sy-submenu">
                {titleNode}
                <ul className="sy-submenu-popup">
                    {children}
                </ul>
            </li>
        );
    }

    return (
        <li className={`sy-submenu ${isOpen ? 'is-open' : ''}`}>
            {titleNode}
            <div className="sy-submenu-inline">
                <ul className="sy-submenu-inline-inner" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                    {children}
                </ul>
            </div>
        </li>
    );
};

// ==========================================
// 预览页面
// ==========================================
export default function SyMenuPreview() {
    const Icons = {
        Dashboard: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>,
        Users: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        Settings: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
        File: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    };

    return (
        <div className="preview-container">
            <style>{paleWhiteMenuStyles}</style>

            <div className="preview-section">
                <h3 className="preview-title">垂直菜单 (Vertical Menu) - 左侧内嵌导航</h3>
                <SyMenu mode="vertical" defaultActive="1">
                    <SyMenuItem id="1" icon={Icons.Dashboard}>工作台</SyMenuItem>
                    <SySubMenu id="sub1" title="用户管理" icon={Icons.Users}>
                        <SyMenuItem id="2">管理员列表</SyMenuItem>
                        <SyMenuItem id="3">普通用户</SyMenuItem>
                        <SyMenuItem id="4" disabled>已封禁账户</SyMenuItem>
                    </SySubMenu>
                    <SySubMenu id="sub2" title="内容管理" icon={Icons.File}>
                        <SyMenuItem id="5">文章审核</SyMenuItem>
                        <SyMenuItem id="6">评论管理</SyMenuItem>
                    </SySubMenu>
                    <SyMenuItem id="7" icon={Icons.Settings}>系统设置</SyMenuItem>
                </SyMenu>
            </div>

            <div className="preview-section">
                <h3 className="preview-title">水平菜单 (Horizontal Menu) - 顶部主导航</h3>
                <SyMenu mode="horizontal" defaultActive="h1">
                    <SyMenuItem id="h1" icon={Icons.Dashboard}>首页</SyMenuItem>
                    <SyMenuItem id="h2" icon={Icons.File}>文档中心</SyMenuItem>
                    <SySubMenu id="h-sub1" title="组件配置" icon={Icons.Settings}>
                        <SyMenuItem id="h3">主题定制</SyMenuItem>
                        <SyMenuItem id="h4">全局样式</SyMenuItem>
                        <SyMenuItem id="h5">本地化 (i18n)</SyMenuItem>
                    </SySubMenu>
                    <SyMenuItem id="h6" disabled>升级专业版</SyMenuItem>
                </SyMenu>
            </div>

        </div>
    );
}

// =========================================================================
// ↓↓↓ 请将以下代码复制到你的本地 Vue 3 项目中 ↓↓↓
// =========================================================================
//
// ============================================================================
// 【1】menu.tsx (外层容器)
// ============================================================================
// import { defineComponent, provide, ref, renderSlot, PropType } from 'vue';
// import { useClassnames } from '@sangyu-ui/utils';
// import './index.less';
// 
// export const MENU_KEY = Symbol('syMenu');
// 
// export default defineComponent({
//     name: 'SyMenu',
//     props: {
//         mode: {
//             type: String as PropType<'horizontal' | 'vertical'>,
//             default: 'vertical'
//         },
//         defaultActive: String,
//         defaultOpeneds: {
//             type: Array as PropType<string[]>,
//             default: () => []
//         }
//     },
//     emits: ['select', 'open-change'],
//     setup(props, { slots, emit }) {
//         const { c } = useClassnames('menu');
//         const activeKey = ref(props.defaultActive);
//         const openKeys = ref<string[]>([...props.defaultOpeneds]);
// 
//         const handleSelect = (key: string) => {
//             activeKey.value = key;
//             emit('select', key);
//         };
// 
//         const handleOpenChange = (key: string) => {
//             const index = openKeys.value.indexOf(key);
//             if (index > -1) {
//                 openKeys.value.splice(index, 1);
//             } else {
//                 openKeys.value.push(key);
//             }
//             emit('open-change', openKeys.value);
//         };
// 
//         provide(MENU_KEY, {
//             activeKey,
//             openKeys,
//             mode: props.mode,
//             handleSelect,
//             handleOpenChange
//         });
// 
//         return () => {
//             const cls = {
//                 [c()]: true,
//                 [c(props.mode)]: true,
//             };
//             return <ul class={cls}>{renderSlot(slots, 'default')}</ul>;
//         };
//     }
// });
// 
// ============================================================================
// 【2】menu-item.tsx (内层项组件)
// ============================================================================
// import { defineComponent, inject, renderSlot } from 'vue';
// import { useClassnames } from '@sangyu-ui/utils';
// import { MENU_KEY } from './menu';
// 
// export default defineComponent({
//     name: 'SyMenuItem',
//     props: {
//         id: { type: String, required: true },
//         disabled: Boolean,
//         icon: Object // 假设你使用 VNode 传入 Icon
//     },
//     setup(props, { slots }) {
//         const { c } = useClassnames('menu');
//         const menuContext = inject<any>(MENU_KEY);
// 
//         const handleClick = () => {
//             if (!props.disabled) {
//                 menuContext.handleSelect(props.id);
//             }
//         };
// 
//         return () => {
//             const isActive = menuContext.activeKey.value === props.id;
//             const cls = {
//                 [c('item')]: true,
//                 ['is-active']: isActive,
//                 ['is-disabled']: props.disabled
//             };
// 
//             return (
//                 <li class={cls} onClick={handleClick}>
//                     {props.icon && <span class={c('item-icon')}>{props.icon}</span>}
//                     <span class={c('item-content')}>{renderSlot(slots, 'default')}</span>
//                 </li>
//             );
//         };
//     }
// });
// 
// ============================================================================
// 【3】sub-menu.tsx (子菜单组件)
// ============================================================================
// import { defineComponent, inject, renderSlot } from 'vue';
// import { useClassnames } from '@sangyu-ui/utils';
// import { MENU_KEY } from './menu';
// 
// export default defineComponent({
//     name: 'SySubMenu',
//     props: {
//         id: { type: String, required: true },
//         title: String,
//         icon: Object
//     },
//     setup(props, { slots }) {
//         const { c } = useClassnames('menu');
//         const menuContext = inject<any>(MENU_KEY);
// 
//         const handleTitleClick = () => {
//             if (menuContext.mode !== 'horizontal') {
//                 menuContext.handleOpenChange(props.id);
//             }
//         };
// 
//         return () => {
//             const isOpen = menuContext.openKeys.value.includes(props.id);
//             const isHorizontal = menuContext.mode === 'horizontal';
//             
//             const cls = {
//                 [c('submenu')]: true,
//                 ['is-open']: isOpen
//             };
// 
//             const titleNode = (
//                 <div class={c('submenu-title')} onClick={handleTitleClick}>
//                     <div style="display: flex; align-items: center;">
//                         {props.icon && <span class={c('item-icon')}>{props.icon}</span>}
//                         <span>{props.title || renderSlot(slots, 'title')}</span>
//                     </div>
//                     <svg class={c('submenu-arrow')} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
//                         <polyline points="6 9 12 15 18 9"></polyline>
//                     </svg>
//                 </div>
//             );
// 
//             if (isHorizontal) {
//                 return (
//                     <li class={cls}>
//                         {titleNode}
//                         <ul class={c('submenu-popup')}>{renderSlot(slots, 'default')}</ul>
//                     </li>
//                 );
//             }
// 
//             return (
//                 <li class={cls}>
//                     {titleNode}
//                     <div class={c('submenu-inline')}>
//                         <ul class={c('submenu-inline-inner')} style="padding:0; margin:0; list-style:none;">
//                             {renderSlot(slots, 'default')}
//                         </ul>
//                     </div>
//                 </li>
//             );
//         };
//     }
// });
//
// ============================================================================
// 【4】index.less (样式文件 - 淡白高级调色)
// ============================================================================
// @import '../../style/index.less';
// /* 请将上述 React 预览代码中 <style> 标签内的内容复制到此处，并进行 Less 嵌套转换（可选） */
// /* 核心代码如：
// .sy-menu { ... }
// .sy-menu-horizontal { ... }
// .sy-menu-vertical { ... }
// ...
// 保持与 React 版本样式一致即可 */