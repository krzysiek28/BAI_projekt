(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0bd600"],{"2c70":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"exchange"},[n("exchange-rates")],1)},a=[],c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"exchangeRates"},[n("b-container",{staticClass:"bv-example-row"},[n("b-row",{attrs:{cols:"1","cols-sm":"1","cols-md":"1","cols-lg":"1"}},[n("b-col",[n("b-table",{attrs:{striped:"",hover:"",fields:e.currencyTableLabels,items:e.rates}})],1)],1)],1)],1)},s=[],u=(n("d3b7"),n("96cf"),n("1da1")),i=n("843f"),o={name:"ExchangeRates",data:function(){return{currenciesList:[],currencyTableLabels:[{key:"currency",label:"Waluta"},{key:"code",label:"Kod"},{key:"bid",label:"Kupno"},{key:"ask",label:"Sprzedaż"}],rates:[]}},created:function(){for(var e=this,t=[],n=window.setInterval((function(){return 0}),9999),r=1;r<n;r++)window.clearInterval(r);var a=function(){var e=Object(u["a"])(regeneratorRuntime.mark((function e(n,r,c){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n();case 2:t[c]&&setTimeout((function(){return a(n,r,c)}),r);case 3:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),c=function(e,n){if(e&&"function"===typeof e){var r=t.length;return t.push(!0),a(e,n,r),r}throw new Error("Callback must be a function")};c(Object(u["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=new Promise((function(t){setTimeout(t(e.fetchData()),1e3)})),t.next=3,n;case 3:case"end":return t.stop()}}),t)}))),5e3)},methods:{fetchData:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["a"].getCurrenciesInfo();case 2:e.currenciesList=t.sent,e.rates=e.currenciesList[0].rates;case 4:case"end":return t.stop()}}),t)})))()}}},l=o,f=n("2877"),b=Object(f["a"])(l,c,s,!1,null,"08d8fa7f",null),h=b.exports,d={name:"Exchange",components:{ExchangeRates:h}},p=d,w=Object(f["a"])(p,r,a,!1,null,"098367ea",null);t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-2d0bd600.8307e032.js.map