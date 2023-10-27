
//GPIO 
void init_gpio(){
    RCC->AHBENR |= RCC_AHB1ENR_GPIOAEN; // Enable GPIOA clock
    GPIOA->MODER &= ~GPIO_MODER_MODER5_1; // Clear GPIOA pin 5 mode
    GPIOA->MODER |= GPIO_MODER_MODER5_0; // Set GPIOA pin 5 to output

    GPIOA->PUPD &= ~GPIO_PUPDR_PUPDR5; // Clear GPIOA pin 5 pull-up/pull-down
    GPIOA->PUPD |= GPIO_PUPDR_PUPDR5_0; // Set GPIOA pin 5 to pull-up
}

// Timer
void init_timer(){
    RCC->APBENR |= RCC_APB1ENR_TIM2EN; // Enable TIM2 clock
    TIM2->PSC = 1600 - 1; // Set prescaler to 1600
    TIM2->ARR = 10000 - 1; // Set auto-reload to 10000
    TIM2->DIER |= TIM_DIER_UIE; // Enable update interrupt
    //TIM2->DIER |= TIM_DIER_UDE; // Enable DMA request

    TIM2->CR1 |= TIM_CR1_CEN; // Enable TIM2

    NVIC_EnableIRQ(TIM2_IRQn); // Enable TIM2 interrupt in NVIC
    
}

// Interrupt
void TIM2_IRQHandler(){
    TIM2->SR &= ~TIM_SR_UIF; // Clear update interrupt flag

    //.../// do something
}

//============================================================================
// setup_dma()
//============================================================================
void setup_dma(void)
{
    // Enables the RCC clock to the DMA controller and configures the following channel parameters:
    RCC->AHBENR |= RCC_AHBENR_DMA1EN;

    // Turn off the enable bit for the channel, like with every other peripheral.
    DMA1_Channel5->CCR &= ~(DMA_CCR_EN);

    // Set "Channel Peripheral Address Register" to the address of the GPIOB_ODR register.
    DMA1_Channel5->CPAR = (uint32_t)(&GPIOB->ODR);

    // Set "Channel Memory Address Register" to the address of the msg array. 
    DMA1_Channel5->CMAR = (uint32_t)(&msg);

    // Set CNDTR to 8. (the amount of data to be transferred)
    DMA1_Channel5->CNDTR = 8;

    // Set the DIRection for copying from-memory-to-peripheral.
    DMA1_Channel5->CCR |= DMA_CCR_DIR;

    // Set the Memory Increment to increment the CMAR for every transfer. (Each LED will have something different on it.)
    DMA1_Channel5->CCR |= DMA_CCR_MINC;

    // Set the Memory datum SIZE to 16-bit.
    DMA1_Channel5->CCR |= DMA_CCR_MSIZE_0;

    // Set the Peripheral datum SIZE to 16-bit.
    DMA1_Channel5->CCR |= DMA_CCR_PSIZE_0;

    // Set the channel for CIRCular operation.
    DMA1_Channel5->CCR |= DMA_CCR_CIRC;
}