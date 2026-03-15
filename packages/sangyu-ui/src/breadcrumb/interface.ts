export interface BreadcrumbProps {
	separator?: string; // default: '/'
	separatorIcon?: string; //分隔图标名称
}

export interface BreadcrumbItemProps {
	to?: string; //点击回调函数
	index?: number; //当前项索引
	total?: number; //总项数
}
