const Footer = () => {
    return (
        <div className="bg-rose-800 py-10">
            <div className="container mx-auto flex justify-between items-center">
                <span className="text-3xl text-white font-bold tracking-tight flex items-center gap-2">
                <img className="w-12 h-12" src="/rafflesia-front.png" />
                Rafflesia
                </span>
                <span className="text-white font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer;