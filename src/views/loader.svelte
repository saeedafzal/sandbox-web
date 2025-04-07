<main>
    <div></div>
</main>

<style>
    main {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    div {
        height: 3rem;
        width: 3rem;
        border: 8px solid #6366f1;
        border-top-color: transparent;
        border-radius: 10rem;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
