export default function NewsDashboardItem() {
    return (
    <div className="flex flex-col lg:max-w-lg lg:max-h-lg max-h-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="rounded-t-lg h-3/4" src="@PictureLink" alt="" />
        <div className="px-2 py-3 flex flex-col">
            <h5 className="mb-2 pl-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Testeintrag</h5>
            <p className="mb-3 mt-2 mx-6 font-normal text-gray-700 dark:text-gray-400">Dies ist ein Test-Eintrag zum testen des Designs</p>
            <button className="inline-flex self-end items-center pr-6 py-2 text-sm font-medium text-center text-black rounded-lg">
                <p>Zum Artikel</p>
                <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
        </div>
    </div>
    )
}