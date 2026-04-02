# Velha AI - Jogo da Velha Inteligente

Um jogo da velha (Tic Tac Toe) interativo com inteligência artificial implementada em React e TypeScript. Jogar contra a IA com diferentes níveis de dificuldade ou assistir a duas IAs competindo entre si.

## 📋 Como o Jogo Funciona

### Objetivo do Jogo
O jogo da velha é um jogo de estratégia entre dois jogadores em um tabuleiro 3x3. O objetivo é ser o primeiro a colocar três símbolos iguais em uma linha (horizontal, vertical ou diagonal).

### Regras Básicas
1. O tabuleiro possui 9 células (3x3)
2. Um jogador usa o símbolo **X** e o outro usa **O**
3. Os jogadores se alternam colocando seus símbolos nas células vazias
4. Um jogador vence quando consegue três símbolos em linha (horizontal, vertical ou diagonal)
5. Se todas as células forem preenchidas sem um vencedor, o jogo termina em empate

### Modos de Jogo

#### 1. **Player vs AI (Jogador vs IA)**
- Você (jogador) controla o símbolo **X**
- A IA controla o símbolo **O**
- Você faz o primeiro movimento
- A IA responde automaticamente após um pequeno delay (400ms)

#### 2. **AI vs AI (IA vs IA)**
- Ambos os lados são controlados pela IA
- Você observe duas IAs competindo entre si
- Útil para ver estratégias diferentes em ação
- Cada movimento tem um delay (600ms) para visualização

### Níveis de Dificuldade

O jogo oferece três níveis de dificuldade que alteram como a IA toma decisões:

| Dificuldade | Estratégia | Taxa de Acerto |
|------------|-----------|----------------|
| **Easy (Fácil)** | 80% aleatório, 20% ótimo | Muito derrotável |
| **Medium (Médio)** | 40% aleatório, 60% ótimo | Equilibrado |
| **Hard (Difícil)** | 100% ótimo | Praticamente impossível vencer |

## 🤖 Como a IA Toma Decisões

### Algoritmo Minimax com Alpha-Beta Pruning

A inteligência artificial do jogo utiliza o **algoritmo Minimax** aprimorado com **Alpha-Beta Pruning** para tomar decisões ótimas.

#### O que é Minimax?

O Minimax é um algoritmo recursivo que:
1. **Simula todos os movimentos possíveis** a partir do estado atual do tabuleiro
2. **Atribui valores** aos resultados:
   - **+10** se a IA vencer
   - **-10** se o jogador vencer
   - **0** se for empate
3. **Escolhe o movimento** que maximiza as chances de vitória (ou minimiza as chances de derrota)

#### Alpha-Beta Pruning

Para melhorar a performance, usamos **Alpha-Beta Pruning**:
- **Alpha (α)**: Melhor valor encontrado para o jogador maximizador
- **Beta (β)**: Melhor valor encontrado para o jogador minimizador
- Se **β ≤ α**, podemos descartar ramos inteiros da árvore de decisão sem avaliá-los
- Isso reduz drasticamente o número de posições avaliadas

### Processo de Tomada de Decisão

```
1. IA recebe o estado atual do tabuleiro
2. Identifica todas as células vazias disponíveis
3. Para cada célula vazia:
   - Simula colocar o símbolo da IA naquela posição
   - Chama Minimax para avaliar essa posição
   - Remove o símbolo (desfaz o movimento simulado)
4. Escolhe a célula com a maior pontuação (melhor resultado)
5. Faz o movimento escolhido no tabuleiro real
```

### Níveis de Dificuldade em Detalhes

#### Easy (Fácil)
```typescript
// 80% chance de movimento aleatório
if (Math.random() < 0.8) {
  escolher célula vazia aleatória
}
// 20% chance de usar algoritmo ótimo
else {
  usar Minimax para encontrar melhor movimento
}
```
- **Resultado**: IA faz muitos movimentos ruins, é fácil de vencer
- **Ideal para**: Iniciantes e diversão casual

#### Medium (Médio)
```typescript
// 40% chance de movimento aleatório
if (Math.random() < 0.4) {
  escolher célula vazia aleatória
}
// 60% chance de usar algoritmo ótimo
else {
  usar Minimax para encontrar melhor movimento
}
```
- **Resultado**: IA combina inteligência com imprevisibilidade
- **Ideal para**: Jogadores intermediários, desafio equilibrado

#### Hard (Difícil)
```typescript
// Sempre utiliza o algoritmo ótimo (Minimax 100%)
return getBestMove(board, aiPlayer)
```
- **Resultado**: IA sempre faz o movimento teoricamente melhor
- **Comportamento**: A IA nunca perde (máximo de empates)
- **Ideal para**: Jogadores experientes, desafio máximo

### Exemplo de Árvore de Decisão Minimax

```
                 Estado Inicial
                     /  |  \
                   /    |    \
                 /      |      \
            Mov1    Mov2    Mov3
            / \      / \      / \
           /   \    /   \    /   \
          +8   -5  +6   +10  0   -10
          ↓     ↓   ↓   ↓    ↓   ↓
      max(+8,-5)  max(+6,+10) max(0,-10)
          = +8         = +10       = 0
              ↓          ↓          ↓
           max(+8, +10, 0) = +10
           
Escolhe Mov2 (maior valor = +10 = vitória garantida)
```

## 🎯 Placar e Estatísticas

O jogo mantém um placar em tempo real:
- **Vitórias do Jogador**: Quantas vezes você venceu
- **Vitórias da IA**: Quantas vezes a IA venceu
- **Empates**: Quantas partidas terminaram em empate

Você pode resetar o placar a qualquer momento para começar uma série nova.

## 🏃 Como Jogar

### Controles
- **Clique em uma célula** para colocar seu símbolo (X)
- **Selecione a dificuldade** antes de jogar
- **Escolha o modo de jogo** (Player vs AI ou AI vs AI)
- **"New Game"** para reiniciar a partida atual
- **"Reset Scores"** para limpar o histórico de vitórias

### Indicadores Visuais
- A **linha vencedora** é destacada quando alguém vence
- Um indicador mostra quando a IA está pensando
- O placar é atualizado automaticamente

## 💻 Tecnologia

- **React**: Framework de interface do usuário
- **TypeScript**: Linguagem tipada para maior segurança
- **Tailwind CSS**: Estilização do layout
- **Vite**: Bundler e servidor de desenvolvimento
- **Algoritmo Minimax**: Inteligência artificial com Alpha-Beta Pruning

## 📚 Conceitos de IA Explorados

Este projeto demonstra:
- **Algoritmos de Busca**: Minimax para explorar espaço de estados
- **Otimização**: Alpha-Beta Pruning para reduzir complexidade
- **Teoria dos Jogos**: Estratégias ótimas em jogos de soma-zero
- **Lógica Recursiva**: Avaliação profunda de possibilidades futuras

---

**Desenvolvido como um projeto inteligente de Jogo da Velha** 🎮
