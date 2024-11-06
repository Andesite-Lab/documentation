## **Adding a Log Strategy**

=== "TypeScript"

    ```typescript
    import { BasaltLogger, ConsoleLoggerStrategy } from '@basalt-lab/basalt-logger';

    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());
    
    logger.log('hello world');
    ```

=== "JavaScript"

    ```javascript
    const { BasaltLogger, ConsoleLoggerStrategy } = require('@basalt-lab/basalt-logger');

    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());

    logger.log('hello world');
    ```

<!-- termynal -->

```bash
$ node example.js
[2023-11-21 00:00:00] LOG : hello world
```

## **Removing a Specific Log Strategy**

=== "TypeScript"

    ```typescript
    import { BasaltLogger, ConsoleLoggerStrategy } from '@basalt-lab/basalt-logger';

    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());

    logger.removeStrategy('console');
    ```

=== "JavaScript"

    ```javascript 
    const { BasaltLogger, ConsoleLoggerStrategy } = require('@basalt-lab/basalt-logger');

    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());
    
    logger.removeStrategy('console');
    ```

## **Removing All Log Strategies**

=== "TypeScript"

    ```typescript
    import { BasaltLogger, ConsoleLoggerStrategy } from '@basalt-lab/basalt-logger';
    
    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());
    
    logger.clearStrategies();
    ```

=== "JavaScript"

    ```javascript
    const { BasaltLogger, ConsoleLoggerStrategy } = require('@basalt-lab/basalt-logger');

    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());

    logger.clearStrategies();
    ```

## **Creating a Log Strategy**

=== "TypeScript"

    ```typescript
    import { appendFileSync } from 'fs';
    import { BasaltLogger, LoggerStrategy, LogLevels}  from '@basalt-lab/basalt-logger';
    
    class FileLoggerStrategy implements LoggerStrategy {
        public log(level: LogLevels, date: Date, object: unknown): void {
            const prefixDate: string = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
            const sanitizedObject: string = typeof object === 'string' ? object : JSON.stringify(object);
            const message: string = `${prefixDate} ${level} : ${sanitizedObject}`;
            appendFile('./test.log', `${message}\n`, (err): void => {
                if (err) throw err;
            });
        }
    }

    const logger = new BasaltLogger();

    logger.addStrategy('file', new FileLoggerStrategy());
    logger.log('Hello World');
    ```

=== "JavaScript"

    ```javascript
    const { appendFileSync } = require('fs');
    const { BasaltLogger, LogLevels } = require('@basalt-lab/basalt-logger');

    class FileLoggerStrategy {
        log(level, date, object) {
            const prefixDate = `[${date.toISOString().replace(/T/, ' ').replace(/\..+/, '')}]`;
            const sanitizedObject = typeof object === 'string' ? object : JSON.stringify(object);
            const message = `${prefixDate} ${level} : ${sanitizedObject}`;
            appendFile('./test.log', `${message}\n`, (err) => {
                if (err) throw err;
            });
        }
    }

    const logger = new BasaltLogger();

    logger.addStrategy('file', new FileLoggerStrategy());
    logger.log('Hello World');
    ```

<!-- termynal -->

```bash
$ node example.js
$ cat test.log
[2023-11-21 00:00:00] LOG : Hello World
```

## **Adding Multiple Log Strategies**


=== "TypeScript"

    ```typescript
    import { BasaltLogger, ConsoleLoggerStrategy, FileLoggerStrategy}  from '@basalt-lab/basalt-logger';
    
    const logger = new BasaltLogger();

    logger.addStrategies([
        ['console', new ConsoleLoggerStrategy()],
        ['file', new FileLoggerStrategy('log.txt')]
    ]);
    
    logger.log('Hello World');
    ```

=== "JavaScript"

    ```javascript
    const { BasaltLogger, ConsoleLoggerStrategy, FileLoggerStrategy } = require('@basalt-lab/basalt-logger');
    
    const logger = new BasaltLogger();

    logger.addStrategies([
        ['console', new ConsoleLoggerStrategy()],
        ['file', new FileLoggerStrategy('log.txt')]
    ]);

    logger.log('Hello World');
    ```

<!-- termynal -->

```bash
$ node example.js
[2023-11-21 00:00:00] LOG : Hello World
$ cat log.txt
[2023-11-21 00:00:00] LOG : Hello World
```

## **All Log Levels**

=== "TypeScript"

    ```typescript
    import { BasaltLogger, ConsoleLoggerStrategy }  from '@basalt-lab/basalt-logger';
    
    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());
    
    logger.log('hello world');
    logger.info('hello world');
    logger.debug('hello world');
    logger.warn('hello world');
    logger.error('hello world');
    ```

=== "JavaScript"

    ```javascript
    const { BasaltLogger, ConsoleLoggerStrategy } = require('@basalt-lab/basalt-logger');

    const logger = new BasaltLogger();

    logger.addStrategy('console', new ConsoleLoggerStrategy());

    logger.log('hello world');
    logger.info('hello world');
    logger.debug('hello world');
    logger.warn('hello world');
    logger.error('hello world');
    ```

<!-- termynal -->

```bash
$ node example.js
[2023-11-21 00:00:00] LOG : hello world
[2023-11-21 00:00:00] INFO : hello world
[2023-11-21 00:00:00] DEBUG : hello world
[2023-11-21 00:00:00] WARN : hello world
[2023-11-21 00:00:00] ERROR : hello world
```

## **Log on specific strategies**

=== "TypeScript"

    ```typescript
    import { BasaltLogger, ConsoleLoggerStrategy, FileLoggerStrategy}  from '@basalt-lab/basalt-logger';
    
    const logger = new BasaltLogger();

    logger.addStrategies([
        ['console', new ConsoleLoggerStrategy()],
        ['file', new FileLoggerStrategy('log.txt')]
    ]);
    
    logger.log('console strategy', ['console']);
    logger.log('file strategy', ['file']);
    logger.log('console and file strategy', ['console', 'file']);
    logger.log('all strategies');
    ```

=== "JavaScript"

    ```javascript
    const { BasaltLogger, ConsoleLoggerStrategy, FileLoggerStrategy } = require('@basalt-lab/basalt-logger');
    
    const logger = new BasaltLogger();

    logger.addStrategies([
        ['console', new ConsoleLoggerStrategy()],
        ['file', new FileLoggerStrategy('log.txt')]
    ]);

    logger.log('console strategy', ['console']);
    logger.log('file strategy', ['file']);
    logger.log('console and file strategy', ['console', 'file']);
    logger.log('all strategies');
    ```

<!-- termynal -->

```bash
$ node example.js
[2023-11-21 00:00:00] LOG : console strategy
[2023-11-21 00:00:00] LOG : console and file strategy
[2023-11-21 00:00:00] LOG : all strategies
$ cat log.txt
[2023-11-21 00:00:00] LOG : file strategy
[2023-11-21 00:00:00 LOG : console and file strategy
[2023-11-21 00:00:00 LOG : all strategies
```

<script data-name="BMC-Widget"
    data-cfasync="false"
    src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
    data-id="necrelox"
    data-description="Support me on Buy me a coffee!"
    data-message="Thank you for visiting!"
    data-color="#5F7FFF"
    data-position="Right"
    data-x_margin="18"
    data-y_margin="22" />
