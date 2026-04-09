步骤条组件需求分析：

1. 父组件 sy-steps,内部字组件 sy-step
2. 父组件 包含默认插槽
3. 父组件 可设置active，设置当前激活的步骤，支持设置的方向direction，是横向还是纵向
4. 子组件可以设置 title description icon status设置当前步骤的状态， 不设置则根据 steps 确定状态
5. sy-step插槽包括icon	自定义图标
title	自定义标题
description	自定义描述文案