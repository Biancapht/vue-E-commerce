<template>
    <div>
        <Navbar></Navbar>
        <Alert></Alert>
        <div class="container-fluid">
        <div class="row">
            <Sidebar></Sidebar>
            <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4"><div class="chartjs-size-monitor" style="position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px; overflow: hidden; pointer-events: none; visibility: hidden; z-index: -1;"><div class="chartjs-size-monitor-expand" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:1000000px;height:1000000px;left:0;top:0"></div></div><div class="chartjs-size-monitor-shrink" style="position:absolute;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1;"><div style="position:absolute;width:200%;height:200%;left:0; top:0"></div></div></div>
                <router-view></router-view>
            </main>
        </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Alert from './AlertMessage';

export default {
    components: {
        Sidebar,
        Navbar,
        Alert
    }
}
</script>