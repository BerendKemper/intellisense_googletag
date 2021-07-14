namespace googletag {
    type NamedSize = string[];
    type SingleSizeArray = [heigth: number, width: number];
    type SingleSize = SingleSizeArray[] | NamedSize[];
    // type SingleSize = SingleSizeArray[];
    // type SingleSize = NamedSize[];
    type MultiSize = SingleSize[];
    type GeneralSize = SingleSize | MultiSize;
    // type GeneralSize = SingleSize;
    // type GeneralSize = MultiSize;
    type SizeMapping = GeneralSize[];
    type SizeMappingArray = SizeMapping[];
    interface CommandArray extends Array<Function> {
        /**Executes the sequence of functions specified in the arguments in order.*/
        push(f: Function): number;
    }
    namespace enums {
        interface OutOfPageFormat {
            TOP_ANCHOR: number;
            BOTTOM_ANCHOR: number;
            REWARDED: number;
            INTERSTITIAL: number;
        };
    };
    interface enums {
        OutOfPageFormat: enums.OutOfPageFormat;
    };
    namespace event {
        interface Event {
            //**Name of the service that triggered the event.*/
            serviceName: string;
            /**The slot that triggered the event.*/
            slot: Slot;
        };
        interface SlotOnloadEvent extends SlotOnloadEvent { };
        interface SlotRenderEndedEvent extends Event {
            /**Advertiser ID of the rendered ad. Value is null for empty slots, backfill ads or creatives rendered by services other than pubads service.*/
            advertiserId: string;
            /**Campaign ID of the rendered ad. Value is null for empty slots, backfill ads or creatives rendered by services other than pubads service.*/
            campaignId: number;
            /**Creative ID of the rendered reservation ad. Value is null for empty slots, backfill ads or creatives rendered by services other than pubads service.*/
            creativeId: number;
            /**true if no ad was returned for the slot, false otherwise.*/
            isEmpty: boolean;
            /**Line item ID of the rendered reservation ad. Value is null for empty slots, backfill ads or creatives rendered by services other than pubads service.*/
            lineItemId: number;
            /**Indicates the pixel size of the rendered creative. Value is null for empty ad slots.*/
            size: SingleSizeArray;
            /**Creative ID of the rendered reservation or backfill ad. Value is null if the ad is not a reservation or line item backfill or a creative rendered by services other than pubads service.*/
            sourceAgnosticCreativeId: number;
            /**Line item ID of the rendered reservation or backfill ad. Value is null if the ad is not a reservation or line item backfill or a creative rendered by services other than pubads service.*/
            sourceAgnosticLineItemId: number;
        };
        interface SlotRequestedEvent extends Event { };
        interface SlotResponseReceived extends Event { };
        interface SlotVisibilityChangedEvent extends Event {
            /**The percentage (0-100) of the ad's area that is visible.*/
            inViewPercentage: number;
        };
    };
    interface CompanionAdsService {
        /**Sets whether companion slots that have not been filled will be automatically backfilled.*/
        setRefreshUnfilledSlots(value: boolean): void;
    };
    interface ContentService {
        /**Fills a slot with the given content.*/
        setContent(slot: Slot, content: string): void;
    };
    interface Slot {
        /**Adds a service to this slot.*/
        addService(content: Service): Slot;
        /**Clears all slot-level ad category exclusion labels for this slot.*/
        clearCategoryExclusions(): Slot;
        /**Clears specific or all custom slot-level targeting parameters for this slot.*/
        clearTargeting(opt_key: string): Slot;
        /**Sets an array of mappings from a minimum viewport size to slot size for this slot.*/
        defineSizeMapping(sizeMapping: SizeMappingArray): Slot;
        /**Returns the value for the AdSense attribute associated with the given key.*/
        get(key: string): string;
        /**Returns the full path of the ad unit, with the network code and ad unit path.*/
        getAdUnitPath(): string;
        /**Returns the list of attribute keys set on this slot.*/
        getAttributeKeys(): string[];
        /**Returns the ad category exclusion labels for this slot.*/
        getCategoryExclusions(): string[];
        /**Returns the ad response information.*/
        getResponseInformation(): void;
        /**Returns the id of the slot element provided when the slot was defined.*/
        getSlotElementId(): string;
        /**Returns a specific custom targeting parameter set on this slot.*/
        getTargeting(key: string): string[];
        /**Returns the list of all custom targeting keys set on this slot.*/
        getTargetingKeys(): string[];
        /**Sets a value for an AdSense attribute on a particular ad slot.*/
        set(key: string, value: string): Slot;
        /**Sets a slot-level ad category exclusion label on this slot.*/
        setCategoryExclusion(categoryExclusion: string): Slot;
        /**Sets the click URL to which users will be redirected after clicking on the ad.*/
        setClickUrl(value: string): Slot;
        /**Sets whether the slot div should be hidden when there is no ad in the slot.*/
        setCollapseEmptyDiv(collapse: boolean, opt_collapseBeforeAdFetch: boolean): Slot;
        /**Configures whether ads in this slot should be forced to be rendered using a SafeFrame container.*/
        setForceSafeFrame(forceSafeFrame: boolean): Slot;
        /**Sets the slot-level preferences for SafeFrame configuration.*/
        setSafeFrameConfig(config: SafeFrameConfig): Slot;
        /**Sets a custom targeting parameter for this slot.*/
        setTargeting(key: string, value: string): Slot;
        /**Sets custom targeting parameters for this slot, from a key:value map in a JSON object.*/
        updateTargetingFromMap(map): Slot;
    };
    interface Service {
        /**Registers a listener that allows you to set up and call a JavaScript function when a specific GPT event happens on the page.*/
        addEventListener(eventType: string, listener: (event: event.Event) => void);
        /**Get the list of slots associated with this service.*/
        getSlots(): Slot[];
    };
    interface SafeFrameConfig {
        /**true to allow expansion by overlay and false otherwise.*/
        allowOverlayExpansion: boolean;
        /**true to allow expansion by overlay and false otherwise.*/
        allowPushExpansion: boolean;
        /**true if SafeFrame should use the HTML5 sandbox attribute to prevent top level navigation.*/
        sandbox: boolean;
        /**Whether to use a unique subdomain for SafeFrame for Reservation creatives.*/
        useUniqueDomain: boolean;
    };
    interface PubAdsService extends Service {
        /**This event is fired when the creative's iframe fires its load event. When rendering rich media ads in sync rendering mode, no iframe is used so no SlotOnloadEvent will be fired.*/
        addEventListener(eventType: "slotOnload", listener: (event: event.SlotOnloadEvent) => void);
        /**This event is fired when the creative code is injected into a slot. This event will occur before the creative's resources are fetched, so the creative may not be visible yet. If you need to know when all creative resources for a slot have finished loading, consider the SlotOnloadEvent instead.*/
        addEventListener(eventType: "slotRenderEnded", listener: (event: event.SlotRenderEndedEvent) => void);
        /**This event is fired when an ad has been requested for a particular slot.*/
        addEventListener(eventType: "slotRequested", listener: (event: event.SlotRequestedEvent) => void);
        /**This event is fired when an ad response has been received for a particular slot.*/
        addEventListener(eventType: "slotResponseReceived", listener: (event: event.SlotResponseReceived) => void);
        addEventListener(eventType: "SlotVisibilityChangedEvent", listener: (event: event.SlotVisibilityChangedEvent) => void);
        /**Registers a listener that allows you to set up and call a JavaScript function when a specific GPT event happens on the page.*/
        addEventListener(eventType: string, listener: (event: event.Event) => void);
        /**Removes the ads from the given slots and replaces them with blank content.*/
        clear(opt_slots: Slot[]): boolean;
        /**Clears all page-level ad category exclusion labels.*/
        clearCategoryExclusions(): PubAdsService;
        /**Clears custom targeting parameters for a specific key or for all keys.*/
        clearTargeting(opt_key: string): PubAdsService;
        /**Enables collapsing of slot divs so that they don't take up any space on the page when there is no ad content to display.*/
        collapseEmptyDivs(opt_collapseBeforeAdFetch: boolean): boolean;
        /**Disables requests for ads on page load, but allows ads to be requested with a googletag.pubads().refresh() call.*/
        disableInitialLoad(): void;
        /**Constructs and displays an ad slot with the given ad unit path and size.*/
        display(adUnitPath: string, size: GeneralSize, opt_div: string, opt_clickUrl: string): void;
        /**Constructs and displays an ad slot with the given ad unit path and size.*/
        display(adUnitPath: string, size: GeneralSize, opt_div: HTMLDivElement, opt_clickUrl: string): void;
        /**Enables lazy loading in GPT as defined by the config object.*/
        enableLazyLoad(opt_config: { fetchMarginPercent: number, renderMarginPercent: number, mobileScaling: number }): void;
        /**Enables single request mode for fetching multiple ads at the same time.*/
        enableSingleRequest(): boolean;
        /**Signals to GPT that video ads will be present on the page.*/
        enableVideoAds(): void;
        /**Returns the value for the AdSense attribute associated with the given key.*/
        get(key: string): string;
        /**Returns the attribute keys that have been set on this service.*/
        getAttributeKeys(): string[];
        /**Returns a specific custom service-level targeting parameter that has been set.*/
        getTargeting(key: string): string[];
        /**Returns the list of all custom service-level targeting keys that have been set.*/
        getTargetingKeys(): string[];
        /**Returns whether or not initial requests for ads was successfully disabled by a previous disableInitialLoad call.*/
        isInitialLoadDisabled(): boolean;
        /**Fetches and displays new ads for specific or all slots on the page.*/
        refresh(opt_slots: Slot[], opt_options: { changeCorrelator: boolean }): void;
        /**Sets values for AdSense attributes that apply to all ad slots under the publisher ads service.*/
        set(key: string, value: string): PubAdsService;
        /**Sets a page-level ad category exclusion for the given label name.*/
        setCategoryExclusion(categoryExclusion: string): PubAdsService;
        /**Enables and disables horizontal centering of ads.*/
        setCentering(centerAds: boolean): void;
        /**Enables Google Ad Manager cookies on ad requests on the page. This option is set by default.
    */
        setCookieOptions(options: 0): PubAdsService;
        /**Ignores Google Ad Manager cookies on subsequent ad requests and prevents cookies from being created on the page. Note that cookies will not be ignored on certain pingbacks and that this option will disable features that rely on cookies, such as dynamic allocation.
    */
        setCookieOptions(options: 1): PubAdsService;
        /**Configures whether all ads on the page should be forced to be rendered using a SafeFrame container.*/
        setForceSafeFrame(forceSafeFrame: boolean): PubAdsService;
        /**Passes location information from websites so you can geo-target line items to specific locations.*/
        setLocation(address: string): PubAdsService;
        /**Allows configuration of all privacy settings from a single API using a config object.*/
        setPrivacySettings(privacySettings: PrivacySettingsConfig): PubAdsService;
        /**Sets the value for the publisher-provided ID.*/
        setPublisherProvidedId(ppid: string): PubAdsService;
        /**Configures the page to request personalized ads.*/
        setRequestNonPersonalizedAds(nonPersonalizedAds: 0): PubAdsService;
        /**Configures the page to request non-personalized ads.*/
        setRequestNonPersonalizedAds(nonPersonalizedAds: 1): PubAdsService;
        /**Sets the page-level preferences for SafeFrame configuration.*/
        setSafeFrameConfig(config: SafeFrameConfig): PubAdsService;
        /**Sets custom targeting parameters for a given key that apply to all pubads service ad slots.*/
        setTargeting(key: string, value: string): PubAdsService;
        /**Sets custom targeting parameters for a given key that apply to all pubads service ad slots.*/
        setTargeting(key: string, value: string[]): PubAdsService;
        /**Sets the video content information to be sent along with the ad requests for targeting and content exclusion purposes.*/
        setVideoContent(videoContentId: string, videoCmsId: string): void;
        /**Changes the correlator that is sent with ad requests, effectively starting a new page view.*/
        updateCorrelator(): PubAdsService;
    };
    interface PrivacySettingsConfig {
        /**childDirectedTreatment configuration indicates whether the page should be treated as child-directed.*/
        childDirectedTreatment: boolean;
        /**limitedAds configuration enables serving to run in limited ads mode to aid in publisher regulatory compliance needs.*/
        limitedAds: boolean;
        /**restrictDataProcessing configuration enables serving to run in restricted processing mode to aid in publisher regulatory compliance needs.*/
        restrictDataProcessing: boolean;
        /**underAgeOfConsent configuration indicates whether to mark ad requests as coming from users under the age of consent.*/
        underAgeOfConsent: boolean;
    };
    interface SizeMappingBuilder {
        /**Adds a mapping from a single-size array representing the viewport to either a single-size array or a multi-size array representing the slot.*/
        addSize(viewportSize: SingleSizeArray, slotSize: GeneralSize): SizeMappingBuilder;
        /**Builds a size map specification from the mappings added to this builder.*/
        build(): SizeMappingArray;
    };
};
export interface googletag {
    /**Flag indicating that GPT API is loaded and ready to be called.*/
    apiReady: boolean;
    /** Reference to the global command queue for asynchronous execution of GPT-related calls.*/
    cmd: googletag.CommandArray;
    /**Flag indicating that Pubads service is enabled, loaded and fully operational.*/
    pubadsReady: boolean;
    enums: googletag.enums;
    /**Returns a reference to the companion ads service used by video ads.*/
    companionAds(): googletag.CompanionAdsService;
    /**Returns a reference to the content service. This service is used to set the content of a slot manually.*/
    content(): googletag.ContentService;
    /**Constructs an out-of-page (interstitial) ad slot with the given ad unit path.*/
    defineOutOfPageSlot(adUnitPath: string, opt_div: string): googletag.Slot;
    /**Constructs an ad slot with a given ad unit path and size and associates it with the ID of a div element on the page that will contain the ad.*/
    defineSlot(adUnitPath: string, size: googletag.GeneralSize, opt_div: string): googletag.Slot;
    /**Destroys the given slots, removing all related objects and references of those slots from GPT.*/
    destroySlots(opt_slots: googletag.Slot[]): boolean;
    /**Disables the Google Publisher Console.*/
    disablePublisherConsole(): void;
    /**Instructs slot services to render the slot.*/
    display(divOrSlot: string): void;
    /**Instructs slot services to render the slot.*/
    display(divOrSlot: HTMLElement): void;
    /**Instructs slot services to render the slot.*/
    display(divOrSlot: googletag.Slot): void;
    /**Enables all GPT services that have been defined for ad slots on the page.*/
    enableServices(): void;
    /**Returns the current version of GPT.*/
    getVersion(): string;
    /**Opens the Google Publisher Console.*/
    openConsole(opt_div: string): void;
    /**Returns a reference to the pubads service.*/
    pubads(): googletag.PubAdsService;
    /**Sets that title for all ad container iframes created by pubads service, from this point onwards.*/
    setAdIframeTitle(title: string): void;
    /**Creates a new SizeMappingBuilder.*/
    sizeMapping(): googletag.SizeMappingBuilder;
};
