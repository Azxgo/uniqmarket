
import { InstagramIcon, TikTokIcon, TwitterIcon, YoutubeIcon } from "../icons/SocialMediaIcons"

export function Footer() {
    return (
        <div className="bg-zinc-900 w-full py-6 sm:gap-5">
            <div className="flex items-center w-full justify-around flex-wrap text-white">
                <div className="flex flex-col gap-2">
                    <h5>Sobre UniqMarket</h5>
                    <a>Contacto</a>
                </div>

                <div className="flex flex-col justify-center items-center gap-3 w-full max-w-[700px]">
                    <a href="/">
                        <img src="/img/logo.png" alt="logo"
                            className="w-20 md:w-24 min-w-[80px] object-contain" />
                    </a>
                    <div className="text-center">
                        <p>©2025 UniqMarket 2</p>
                        <p>Creado por Agustin Moreira</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <a href="/"><InstagramIcon /></a>
                    <a href="/"><TwitterIcon /></a>
                    <a href="/"><YoutubeIcon /></a>
                    <a href="/"><TikTokIcon /></a>
                </div>
            </div>
        </div>
    )
}