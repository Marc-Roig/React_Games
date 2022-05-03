import "./Card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {

    const handleClick = () => {
        if (disabled) return;
        handleChoice(card);
    }

    return (
        <div className='card' key={card.id}>
            <div className={flipped ? "flipped" : ""}>
                <img
                    className="front"
                    src={card.src}
                    alt="card front"
                />
                <img
                    className="back"
                    onClick={handleClick}
                    src="/img/cover.jpeg"
                    alt="cover"
                />
            </div>

        </div >
    )
}