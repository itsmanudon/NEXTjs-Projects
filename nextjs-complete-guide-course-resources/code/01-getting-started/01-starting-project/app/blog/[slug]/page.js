export default function BlogPostPage({ params }) {
    return (
        <main>
            <h1>Blog Post</h1>
            <p>{params.slug}</p>
            <p>This is a blog post.</p>
        </main>
    );
}