##ListRenderJs 基于Backbone的列表渲染插件
======================================
本插件依赖于Jquery,Backbone,Underscore
###使用说明:
1.引入js文件
```html
<script src="ListRender.js"></script>
```
2.进行渲染
```js
	$("#main").renderList({
		//指明要渲染的模板（必选）
		tpl : "#photo-item-template",
		//指明列表数据来源（必选）
        data_url : "data/PhotosInfo.json",
        //指明列表DOM（必选）
        list_container : "#photo-list",
        //指明渲染时调用的操作（可选）
        custom_render : function(){
        }
	});
```