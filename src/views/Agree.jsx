export function Agree({agreed}) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="flex flex-col w-full h-screen items-center justify-center opacity-0 animate-fade fill-mode-forwards">
            <div className="m-4 flex flex-col items-center justify-center px-8 py-12 bg-dark-900 rounded-3xl">
                <h1 className={`max-w-96 text-white mb-6 text-4xl drop-shadow-m font-lobster`}>Welcome to quibbble.com!</h1>
                <h1 className={`max-w-96 text-white mb-4 text-xl drop-shadow-m`}>Please read and agree to our <a target="_blank" href="/terms-of-service" className="text-yellow underline font-bold">terms of service</a> and <a target="_blank" href="/privacy-policy" className="text-yellow underline font-bold">privacy policy</a> to enter.</h1>
                <div onClick={() => agreed()} className="group mt-4 cursor-pointer font-bold flex items-center justify-center">
                    <p className="ml-1 text-slate group-hover:text-yellow transition ease-in-out duration-500">agree and enter</p>
                    <svg className="fill-slate group-hover:fill-yellow ml-2 transition ease-in-out duration-500 group-hover:translate-x-2" width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.7273 8.34814C18.7413 8.23663 18.7413 8.1238 18.7273 8.01229V7.93168C18.7267 7.78905 18.6993 7.64779 18.6467 7.51522C18.5909 7.36441 18.5039 7.22707 18.3914 7.1122L11.6743 0.39509C11.4214 0.142118 11.0783 0 10.7205 0C10.3627 0 10.0196 0.142118 9.76667 0.39509C9.5137 0.648061 9.37158 0.991164 9.37158 1.34892C9.37158 1.70667 9.5137 2.04978 9.76667 2.30275L14.2268 6.58826L1.34342 6.58826C0.987124 6.58826 0.64542 6.7298 0.393479 6.98174C0.141539 7.23368 0 7.57539 0 7.93168C0 8.28798 0.141539 8.62969 0.393479 8.88163C0.64542 9.13357 0.987124 9.2751 1.34342 9.2751L14.2268 9.2751L9.79354 13.695C9.66763 13.8199 9.56768 13.9684 9.49948 14.1321C9.43127 14.2958 9.39616 14.4714 9.39616 14.6488C9.39616 14.8261 9.43127 15.0017 9.49948 15.1654C9.56768 15.3291 9.66763 15.4777 9.79354 15.6026C9.91843 15.7285 10.067 15.8285 10.2307 15.8967C10.3944 15.9649 10.57 16 10.7474 16C10.9247 16 11.1003 15.9649 11.264 15.8967C11.4277 15.8285 11.5763 15.7285 11.7012 15.6026L18.4183 8.88551C18.5267 8.76747 18.6132 8.63098 18.6736 8.48249C18.6994 8.44131 18.7176 8.3958 18.7273 8.34814Z"/>
                    </svg>
                </div>
            </div>
        </div>
      </div>
    )
}
