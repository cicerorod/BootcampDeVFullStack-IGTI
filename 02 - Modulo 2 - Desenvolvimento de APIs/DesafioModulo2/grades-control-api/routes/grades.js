const express = require('express');
const fs = require('fs').promises;
const router = express.Router();

function createDateAsUTC(date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );
}

// criar novo registro
router.post('/', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    var date = new Date();

    let newGrade = {
      student: req.body.student,
      subject: req.body.subject,
      type: req.body.type,
      value: req.body.value,
      timestamp: createDateAsUTC(date),
    };

    let grade = { id: json.nextId++, ...newGrade };
    json.grades.push(grade);
    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.status(200).send(grade);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// pesquisar todos
router.get('/', async (_, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let retorno = JSON.parse(data);
    delete retorno.nextid;
    res.send(retorno);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//pesquisar por id
router.get('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const grade = json.grades.find(
      (grade) => grade.id === parseInt(req.params.id, 10)
    );

    if (grade) {
      res.send(grade);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//pesquisar por nome do estudante
router.get('/student/:student', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const grades = json.grades.filter(
      (grade) => grade.student === req.params.student
    );

    if (grades) {
      res.status(200).send(grades);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//pesquisar nota total de um aluno em uma disciplina (student e subject)
router.get('/notatotal/:student/:subject', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const grades = json.grades.filter(
      (grade) =>
        grade.student === req.params.student &&
        grade.subject === req.params.subject
    );

    if (grades) {
      let somaNotaTotal = 0;
      somaNotaTotal = grades.reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

      let namesHTML = 'Student : ' + req.params.student;
      namesHTML += '<ul>';

      grades.forEach((grade) => {
        const { subject, type, value } = grade;
        const nameHTML = `<li> Subject: ${subject} -> Type: ${type} -> Value: ${value} </li>`;
        namesHTML += nameHTML;
      });
      namesHTML += '</ul> </br>';
      namesHTML += 'Nota Total: ' + somaNotaTotal;

      res.status(200).send(namesHTML);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//pesquisar media das grades (subject e type)
router.get('/media/:subject/:type', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const grades = json.grades.filter(
      (grade) =>
        grade.subject === req.params.subject && grade.type === req.params.type
    );

    if (grades) {
      let somaNotaTotal = grades.reduce((accumulator, current) => {
        return accumulator + current.value;
      }, 0);

      let media = somaNotaTotal / grades.length;

      let namesHTML = '';
      namesHTML += '<ul>';

      grades.forEach((grade) => {
        const { subject, type, value } = grade;
        //const nameHTML = `<li>${subject} -> ${type} : ${value} </li>`;
        const nameHTML = `<li> Subject: ${subject} -> Type: ${type} -> Value: ${value} </li>`;

        namesHTML += nameHTML;
      });
      namesHTML += '</ul> </br>';
      namesHTML += 'Nota Total: ' + media;

      res.status(200).send(namesHTML);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

//pesquisar 3 melhores grades (subject e type)
router.get('/melhor/:subject/:type', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const grades = json.grades.filter(
      (grade) =>
        grade.subject === req.params.subject && grade.type === req.params.type
    );

    if (grades) {
      const teste = grades
        .sort((a, b) => (a.value < b.value ? 1 : b.value < a.value ? -1 : 0))
        .slice(0, 3);

      let namesHTML = '';
      namesHTML += '<ul>';
      teste.forEach((grade) => {
        const { id, subject, type, value } = grade;
        //const nameHTML = `<li>${subject} -> ${type} : ${value} </li>`;
        const nameHTML = `<li> Id: ${id} -> Subject: ${subject} -> Type: ${type} -> Value: ${value} </li>`;
        namesHTML += nameHTML;
      });
      namesHTML += '</ul>';

      res.status(200).send(namesHTML);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// deletar registro
router.delete('/:id', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    let grades = json.grades.filter(
      (account) => account.id !== parseInt(req.params.id, 10)
    );
    json.grades = grades;
    await fs.writeFile(global.filemane, JSON.stringify(json));
    res.end();
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Atualizar registro
router.put('/', async (req, res) => {
  try {
    let newgrade = req.body;
    let data = await fs.readFile(global.filemane, 'utf8');

    let json = JSON.parse(data);
    let oldindex = json.grades.findIndex((grade) => grade.id === newgrade.id);

    if (oldindex > 0) {
      json.grades[oldindex].student = newgrade.student;
      json.grades[oldindex].subject = newgrade.subject;
      json.grades[oldindex].type = newgrade.type;
      json.grades[oldindex].value = newgrade.value;
      json.grades[oldindex].timestamp = json.grades[oldindex].timestamp;

      let newItem = json.grades[oldindex];

      await fs.writeFile(global.filemane, JSON.stringify(json));
      res.status(200).send(newItem);
    } else {
      res
        .status(400)
        .send({ error: 'Registro ' + newgrade.id + ' não encontrado' });
    }
  } catch (error) {
    res.status(400).send({ error: err.message });
  }
});

//pesquisar por nome do estudante
router.get('/subject/:subject', async (req, res) => {
  try {
    let data = await fs.readFile(global.filemane, 'utf8');
    let json = JSON.parse(data);
    const grades = json.grades.filter(
      (grade) => grade.subject === req.params.subject
    );

    if (grades) {
      res.status(200).send(grades);
    } else {
      res.end();
    }
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

module.exports = router;
