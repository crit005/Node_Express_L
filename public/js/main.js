$(document).ready(() => {
    $('.delete-article').on('click', (e) => {
        $taget = $(e.target);
        const id = $taget.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: `/articles/${id}`,
            success: (res) => {
                alert(`Delete Article`);
                window.location.href = `/`;
            },
            error: (err) => {
                console.log(err);
            }
        })
    })
});