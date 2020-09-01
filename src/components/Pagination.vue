<template>
    <div>
       <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item" :class="{'disabled': !pages.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="changePage(pages.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                <li class="page-item" 
                    v-for="page in pages.total_pages" :key="page"
                    :class="{'active': pages.current_page === page}">
                    <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{'disabled': !pages.has_next}">
                    <a class="page-link" href="#" aria-label="Next" @click.prevent="changePage(pages.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav> 
    </div>
</template>

<script>
export default {
    // 從父元件傳入值到子元件（pages）
    props: ['pages'],
    methods: {
        changePage(page) {
            // 子元件可以使用 $emit 觸發父元件的自定義事件 (emit)
            // 附加引數傳給監聽器回撥
            this.$emit('emit', page);
        }
    },

}
</script>