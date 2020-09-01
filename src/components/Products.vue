<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <div class="text-right mt-4">
            <button class="btn btn-primary" @click="openModal(true, {}, 'edited')">建立新產品</button>
        </div>
        <table class="table mt-4">
            <thead>
                <th width="120">分類</th>
                <th>產品</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="150">編輯</th>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td>{{ product.category }}</td>
                    <td>{{ product.title }}</td>
                    <td class="text-right">{{ product.origin_price}}</td>
                    <td class="text-right">{{ product.price}}</td>
                    <td>
                        <!-- 產品啟用 is_enabled == 1 -->
                        <span class="text-success" v-if="product.is_enabled">啟用</span> 
                        <span v-else>未啟用</span>
                    </td>
                    <td>
                        <button class="btn btn-outline-primary btn-sm" @click="openModal(false, product, 'edited')">編輯</button>
                        <button class="btn btn-outline-danger btn-sm" @click="openModal(false, product, 'deleted')">刪除</button>
                    </td>
                </tr>
                
            </tbody>
        </table>
        <!-- Pagination -->
        <Pagination :pages='pagination' @emit="getProducts"></Pagination>
        <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-dark text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>新增產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                        <label for="image">輸入圖片網址</label>
                        <input type="text" class="form-control" id="image"
                            placeholder="請輸入圖片連結" 
                            v-model="tempProduct.imageUrl">
                        </div>
                        <div class="form-group">
                        <label for="customFile">或 上傳圖片
                            <!-- font awesome -->
                            <font-awesome-icon icon="spinner" spin v-if="status.fileUploading"/>
                        </label>
                        <input type="file" id="customFile" class="form-control"
                            ref="files" @change="uploadFile()">
                        </div>
                        <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                        class="img-fluid" alt="" :src="tempProduct.imageUrl">
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                        <label for="title">標題</label>
                        <input type="text" class="form-control" id="title"
                            placeholder="請輸入標題" 
                            v-model="tempProduct.title">
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="category">分類</label>
                            <input type="text" class="form-control" id="category"
                                placeholder="請輸入分類" 
                                v-model="tempProduct.category">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">單位</label>
                            <input type="unit" class="form-control" id="unit"
                                placeholder="請輸入單位" 
                                v-model="tempProduct.unit">
                        </div>
                        </div>

                        <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="origin_price">原價</label>
                            <input type="number" class="form-control" id="origin_price"
                                placeholder="請輸入原價" 
                                v-model="tempProduct.origin_price">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="price">售價</label>
                            <input type="number" class="form-control" id="price"
                                placeholder="請輸入售價" 
                                v-model="tempProduct.price">
                        </div>
                        </div>
                        <hr>

                        <div class="form-group">
                        <label for="description">產品描述</label>
                        <textarea type="text" class="form-control" id="description"
                            placeholder="請輸入產品描述" 
                            v-model="tempProduct.description"></textarea>
                        </div>
                        <div class="form-group">
                        <label for="content">說明內容</label>
                        <textarea type="text" class="form-control" id="content"
                            placeholder="請輸入產品說明內容" 
                            v-model="tempProduct.content"></textarea>
                        </div>
                        <div class="form-group">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                                id="is_enabled" 
                                :true-value="1" 
                                :false-value="0" 
                                v-model="tempProduct.is_enabled">
                            <label class="form-check-label" for="is_enabled">
                            是否啟用
                            </label>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct()">確認</button>
                </div>
                </div>
            </div>
            </div>
            <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
            aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="exampleModalLabel">
                    <span>刪除產品</span>
                    </h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="deleteProduct()"
                    >確認刪除</button>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';
import Pagination from './Pagination';

export default {
    data() {
        return {
            products: [],
            tempProduct: {},
            pagination: {},
            isNew: false, // 判斷為編輯或建立
            isLoading: false, // 是否啟用 Loading 元件
            status: {
                fileUploading: false
            }
        }
    },
    components: {
        Pagination
    },
    methods: {
        // 產品列表網頁有新增、編輯、刪除產品的需求，每次更新產品都會需要重新呼叫產品列表
        // 所以才會在 methods 寫 getProducts，不直接將 getProducts 放在 created
        getProducts(page = 1) {
            const getApi = `${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/products?page=${page}`;
            this.isLoading = true;
            this.$http.get(getApi, this.user).then((res) => {
                console.log(res.data);
                this.isLoading = false;
                this.products = res.data.products;
                this.pagination = res.data.pagination;
            });
        },
        updateProduct() {
            let updateaApi, httpMethod;
            if(this.isNew) {
                updateaApi = `${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/product`;
                httpMethod = 'post';
            }else {
                updateaApi = `${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/product/${this.tempProduct.id}`;
                httpMethod = 'put';
            }
            // 注意回傳結構是 {data:{}}
            this.$http[httpMethod](updateaApi, {data:this.tempProduct}).then((res) => {
                console.log(res.data);
                if(res.data.success) {
                    this.closeModal('edited');
                    this.getProducts();
                }else {
                    this.closeModal('edited');
                    this.getProducts();
                    alert('新增失敗');
                }
            });
        },
        deleteProduct() {
            const deleteApi = `${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/product/${this.tempProduct.id}`;
            this.$http.delete(deleteApi).then((res) => {
                console.log(res.data);
                if(res.data.success) {
                    this.closeModal('deleted');
                    this.getProducts();
                }else {
                    this.closeModal('deleted');
                    this.getProducts();
                    alert('刪除失敗');
                }
            })
        },
        uploadFile() {
            console.log(this);
            this.status.fileUploading = true;
            const file = this.$refs.files.files[0];
            // 1. 先建立 FormData() 物件
            const formData = new FormData();
            const uploadApi = `${process.env.APIPATH}/api/${process.env.COSTOMPATH}/admin/upload`;

            // 2. 追加新值到 FormData()
            formData.append('file-to-upload', file);
            // 3. 以 form-data 的形式打包上傳
            this.$http.post(uploadApi, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // 4. 將回傳的 url，以 $set 的方式強制寫入 
                console.log(res.data);
                if(res.data.success) {
                    // 這樣是無法雙向綁定的，tempProduct.imageUrl 沒有雙向綁定主要是因為一開始在 data 中沒有定義 imgUrl 屬性
                    // 而在 Modal 的 HTML 的產品欄位標題中使用 v-model="tempProduct.title" 就是一個標準的雙向綁定用法

                    // this.tempProduct.imageUrl = res.data.imageUrl
                    this.$set(this.tempProduct, 'imageUrl', res.data.imageUrl);
                    $('#customFile').val('');
                }else {
                    this.$bus.$emit('message:push', res.data.message, 'danger');
                }
                this.status.fileUploading = false;
            });
            
        },
        openModal(isNew, product, type) {
            if(isNew) {
                this.isNew = true; 
                this.tempProduct = {};
            }else {
                this.isNew = false;
                // 因為每次所選的編輯產品都不同，所以要使用 Object.assign，避免因為傳參考的特性而不小心改值
                // ES6 淺層複製 Object.assign(target, ...sources)
                this.tempProduct = Object.assign({}, product); 
            }

            type == 'edited' ? $('#productModal').modal('show') : $('#delProductModal').modal('show');
            
        },
        closeModal(type) {
            type == 'edited' ? $('#productModal').modal('hide') : $('#delProductModal').modal('hide');
        }
    },
    created() {
        this.getProducts();
    }
}
</script>