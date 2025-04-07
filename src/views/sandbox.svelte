<script lang="ts">
    import Loader from "./loader.svelte";

    const isLoading = true;
</script>

{#if isLoading}
    <Loader />
{:else}
{/if}

<style>
    :global {
        *, :after, :before, ::backdrop {
            box-sizing: border-box;
        }
        
        body {
            font-family: system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
            line-height: 1.5;
        }
        
        body, h1, h3 {
            margin: 0;
        }
        
        main {
            position: fixed;
            height: 100%;
            width: 100%;
            background: #f1f5f9;
        }
    }
</style>
