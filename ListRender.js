/*
* @require jquery,backbone,underscore 
* @renderList 列表渲染插件
* @date: 2015-01-02
* @version 0.1 
* Copyright (c) 2015 666
* 
* 该插件完成列表的展示 
*/ 
(function ($) {
	$.fn.renderList = function(options){
		var defaults = {    
		    element : this,
	        tpl : "",
	        data_url : "",
	        list_container : "",
	        custom_render : function(){
        	}

	  	};
        var opts = $.extend(defaults, options);
		//定义列表项
		var Item = Backbone.Model.extend({});

		//定义列表
		var List = Backbone.Collection.extend({
			model : Item,
			url : opts.data_url,
		});

		//定义每一项的视图
		var ItemView = Backbone.View.extend({
			tagName : "li",
			photoItemTemplate : _.template($(opts.tpl).html()),
			render : function(){
				this.$el.html(this.photoItemTemplate(this.model.toJSON()));
				return this;
			},
		});
		//定义列表视图
		var ListView = Backbone.View.extend({
			el : $(opts.element),
			initialize : function() {
				this.list = new List();
				this.list.bind('reset',this.addAll,this);
				this.list.bind('all',this.render,this);
				this.list.fetch({
					silent : true,
					success : function(collection,response){
						if(response!=null)
							collection.reset(response);
						else
							ListView.render();
					}
				});
			},
			render : function(){
				opts.custom_render();
			},
			//添加列表项
			addOne : function(item){
				var view = new ItemView({model:item});
				this.$(opts.list_container).append(view.render().el);
			},
			addAll : function(){
				this.list.each(this.addOne);
			},
		});
		return new ListView();
	}
})(jQuery);
