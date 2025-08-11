
export default function NavLink() {
    return (
        <Link href="/meals" className={path.startsWith('/meals') ? classes.active : undefined}>Browse Meals</Link>
    );
}