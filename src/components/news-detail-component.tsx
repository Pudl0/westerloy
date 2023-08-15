import Image from 'next/image'

export default function NewsDetail() {
    return (
        <div className="mt-10">
    <div className="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative">
        <div className="absolute left-0 bottom-0 w-full h-full z-10"></div>
        <Image className="absolute left-0 top-0 w-full h-full z-0 object-cover" src="" width={800} height={600} alt="" />
        <div className="p-4 absolute bottom-0 left-0 z-20">
            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                Dies ist ein Beispieltitel
            </h2>
        </div>
    </div>
    <div className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
        Lorem Ipsum 
    </div>
</div>

    )
}