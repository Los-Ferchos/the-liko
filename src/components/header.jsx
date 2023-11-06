function Header(){
    return (
        <div className="header">
            <div className="upper-header">
                <header className="header__left">
                    <h2>The Liko</h2>
                </header>
                <header className="header__right">
                    <ul>
                        <li>Profile</li>
                        <li>Cart</li>
                    </ul>
                </header>
            </div>
            <div className="lower-header">
                <ul>
                    <li>Liqueurs</li>
                    <li>Soft Drinks</li>
                    <li>Extras</li>
                </ul>
            </div>
        </div>
    )
}

export default Header