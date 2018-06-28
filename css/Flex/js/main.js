const app = new Vue({
    el: "#app",
    data: {
        clear: false
    },
    methods: {
        rowReverse() {
            this.$refs.row.style.flexDirection = "row-reverse";
        },

        column() {
            this.$refs.row.style.flexDirection = "column";
        },

        columnReverse() {
            this.$refs.row.style.flexDirection = "column-reverse";
        },




        juetflexend() {
            // this.$refs.aaa.style.background = "#f00";
            this.$refs.aaa.style.justifyContent = "flex-end";
        },

        justcenter() {
            this.$refs.aaa.style.justifyContent = "center";
        },

        justspacebetween() {
            this.$refs.aaa.style.justifyContent = "space-between";
        },

        justspacearound() {
            this.$refs.aaa.style.justifyContent = "space-around";
        },

        changedirection() {
            this.$refs.aaa.style.flexDirection = "column";
        },





        alignitemsflexend() {
            this.$refs.alignitems.style.alignItems = "flex-end";
        },

        alignitemscenter() {
            this.$refs.alignitems.style.alignItems = "center";
        },

        alignitemsbaseline() {
            this.$refs.item2.style.fontSize = "2rem";
            this.$refs.alignitems.style.alignItems = "baseline";
        },

        alignitemsstretch() {
            this.clear = true;
            this.$refs.alignitems.style.alignItems = "stretch";
        },



        flexwrapwrap() {
            this.$refs.flexwrap.style.flexWrap = "wrap";
        },


        wrapreverse() {
            this.$refs.flexwrap.style.flexWrap = "wrap-reverse";
        },

        changeorder() {
            this.$refs.item2order.style.order = 3;
        },



        // flex-grow
        flexgrow() {
            this.$refs.flexgrow1.style.flexGrow = 1;
            this.$refs.flexgrow2.style.flexGrow = 2;
            this.$refs.flexgrow3.style.flexGrow = 3;

            this.$refs.span1.innerHTML = 100 + 700 * ( 1 / 6) +"px";
            this.$refs.span2.innerHTML = 100 + 700 * (2 / 6) + "px";
            this.$refs.span3.innerHTML = 100 + 700 * (3 / 6) + "px";
        },


        flexshrink() {
            this.$refs.shrinkcontainer.style.width = "800px";

            this.$refs.span11.innerHTML = 200 - 100 * 1 * 200 / 2000+  "px";
            this.$refs.span22.innerHTML = 300 - 100 * 2 *300  / 2000+ "px";
            this.$refs.span33.innerHTML = 400 - 100 * 3 * 400 / 2000 + "px";
        },



        // align-self
        alignselfflexend() {
            this.$refs.alignselfitem2.style.alignSelf = "flex-end";
        },

        // align-self
        alignselfcenter() {
            this.$refs.alignselfitem2.style.alignSelf = "center";
        },


        setflex() {
            this.$refs.addflex.style.display = "flex";
        }

        //   // align-self
        // alignselfbaseline() {
        //     this.$refs.alignself.style.alignItems = "center";
        //     this.$refs.alignselfitem2.style.fontSize = "20px";
        //     this.$refs.alignselfitem3.style.fontSize = "10px";
        //     this.$refs.alignselfitem2.style.alignSelf = "baseline";
        // }




    }
})